import aboutMeMd from '@/assets/knowledge/about-me.md?raw'

const LOG = '[Chatbot]'

function readEnv(name) {
  return import.meta.env[`VITE_AI_${name}`] || import.meta.env[`GROQ_${name}`] || ''
}

const config = {
  apiKey: readEnv('API_KEY'),
  endpoint: readEnv('API_URL') || readEnv('ENDPOINT') || 'https://api.groq.com/openai/v1/chat/completions',
  model: readEnv('API_MODEL') || readEnv('MODEL') || 'llama-3.3-70b-versatile',
}

export function setConfig(newConfig) {
  Object.assign(config, newConfig)
}

const SYSTEM_PROMPT = `Você é o assistente virtual de Carlos Bezerra Neto. Siga as regras abaixo:

Responda SEMPRE no mesmo idioma da pergunta do usuário. Se falar em português, responda em português. Se em inglês, inglês. Espanhol, francês, etc. — espelhe o idioma. Se ambíguo, use português.

Fale de Carlos em terceira pessoa ("ele", "Carlos", "dele"). Nunca finja ser ele.

Escreva como uma conversa natural entre duas pessoas, como se estivesse falando em voz alta. Nada de listas, tópicos com travessão, asteriscos ou markdown. Nada de negrito, itálico ou qualquer formatação. Use apenas texto puro, em parágrafos fluidos e com tom amigável.

Seja estratégico: não despeje tudo de uma vez. Responda de forma concisa, no máximo 5 a 7 linhas. No final, pergunte educadamente se a pessoa quer saber mais detalhes sobre aquele tópico. Assim a conversa fica natural e a pessoa decide se quer aprofundar.

Use SOMENTE as informações da base de conhecimento abaixo. Não invente nada. Se não souber, diga educadamente que não tem essa informação.

## Base de Conhecimento / Knowledge Base:
${aboutMeMd}`

export async function getAnswer(question, t, onChunk) {
  console.log(`${LOG} query:`, { question, lang: 'via i18n' })

  if (!config.apiKey) {
    console.error(`${LOG} missing API key`)
    return { content: t('chatbot.errors.noKey'), error: true }
  }

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 30000)

  try {
    const res = await fetch(config.endpoint, {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${config.apiKey}`,
      },
      body: JSON.stringify({
        model: config.model,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: question },
        ],
        stream: true,
        temperature: 0.3,
        max_completion_tokens: 1000,
      }),
    })

    clearTimeout(timeoutId)

    if (!res.ok) {
      console.error(`${LOG} HTTP ${res.status}`)
      if (res.status === 401 || res.status === 403) {
        return { content: t('chatbot.errors.invalidKey'), error: true }
      }
      if (res.status >= 500) {
        return { content: t('chatbot.errors.api'), error: true }
      }
      return { content: t('chatbot.errors.unknown'), error: true }
    }

    const reader = res.body.getReader()
    const decoder = new TextDecoder()
    let buffer = ''
    let fullContent = ''

    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      buffer += decoder.decode(value, { stream: true })
      const lines = buffer.split('\n')
      buffer = lines.pop() || ''

      for (const line of lines) {
        const trimmed = line.trim()
        if (!trimmed || !trimmed.startsWith('data: ')) continue

        const payload = trimmed.slice(6)
        if (payload === '[DONE]') continue

        try {
          const parsed = JSON.parse(payload)
          const delta = parsed.choices?.[0]?.delta
          if (delta?.content) {
            fullContent += delta.content
            onChunk?.(fullContent)
          }
        } catch {
          // skip malformed JSON
        }
      }
    }

    if (!fullContent) {
      console.error(`${LOG} empty stream`)
      return { content: t('chatbot.errors.empty'), error: true }
    }

    return { content: fullContent }
  } catch (err) {
    clearTimeout(timeoutId)
    console.error(`${LOG} ${err.name}:`, err.message, err.cause || '')

    if (err.name === 'AbortError') {
      return { content: t('chatbot.errors.timeout'), error: true }
    }
    if (err.name === 'TypeError') {
      if (err.message.includes('fetch') || err.message.includes('Failed to fetch') || err.message.includes('CORS')) {
        return { content: t('chatbot.errors.cors'), error: true }
      }
      return { content: t('chatbot.errors.network'), error: true }
    }
    return { content: t('chatbot.errors.unknown', { detail: err.message }), error: true }
  }
}

export const chatbotService = { getAnswer, setConfig }
