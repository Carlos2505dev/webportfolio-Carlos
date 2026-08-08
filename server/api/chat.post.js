import { readFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const aboutMePath = resolve(__dirname, '../../assets/knowledge/about-me.md')
const aboutMeMd = readFileSync(aboutMePath, 'utf-8')

function readEnv(name) {
    return process.env[`AI_${name}`] || process.env[`VITE_AI_${name}`] || process.env[`GROQ_${name}`] || ''
}

const config = {
    apiKey: readEnv('API_KEY'),
    endpoint: readEnv('ENDPOINT') || readEnv('URL') || 'https://api.groq.com/openai/v1/chat/completions',
    model: readEnv('MODEL') || 'llama-3.3-70b-versatile'
}

const SYSTEM_PROMPT = `Você é o assistente virtual de Carlos Bezerra Neto. Siga as regras abaixo:

Responda SEMPRE no mesmo idioma da pergunta do usuário. Se falar em português, responda em português. Se em inglês, inglês. Espanhol, francês, etc. — espelhe o idioma. Se ambíguo, use português.

Fale de Carlos em terceira pessoa ("ele", "Carlos", "dele"). Nunca finja ser ele.

Escreva como uma conversa natural entre duas pessoas, como se estivesse falando em voz alta. Nada de listas, tópicos com travessão, asteriscos ou markdown. Nada de negrito, itálico ou qualquer formatação. Use apenas texto puro, em parágrafos fluidos e com tom amigável.

Seja estratégico: não despeje tudo de uma vez. Responda de forma concisa, no máximo 5 a 7 linhas. No final, pergunte educadamente se a pessoa quer saber mais detalhes sobre aquele tópico. Assim a conversa fica natural e a pessoa decide se quer aprofundar.

Use SOMENTE as informações da base de conhecimento abaixo. Não invente nada. Se não souber, diga educadamente que não tem essa informação.

## Base de Conhecimento / Knowledge Base:
${aboutMeMd}`

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const { question, locale } = body

    if (!question || typeof question !== 'string' || question.trim().length === 0) {
        throw createError({ statusCode: 400, statusMessage: 'Question is required' })
    }

    if (!config.apiKey) {
        throw createError({ statusCode: 500, statusMessage: 'API key not configured' })
    }

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 30000)

    try {
        const res = await fetch(config.endpoint, {
            method: 'POST',
            signal: controller.signal,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${config.apiKey}`
            },
            body: JSON.stringify({
                model: config.model,
                messages: [
                    { role: 'system', content: SYSTEM_PROMPT },
                    { role: 'user', content: question }
                ],
                stream: true,
                temperature: 0.3,
                max_completion_tokens: 1000
            })
        })

        clearTimeout(timeoutId)

        if (!res.ok) {
            throw createError({ statusCode: res.status, statusMessage: `AI API error: ${res.status}` })
        }

        setResponseHeaders(event, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive'
        })

        const reader = res.body.getReader()
        const decoder = new TextDecoder()
        let buffer = ''

        const stream = new ReadableStream({
            async start(controller) {
                try {
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
                                    controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({ content: delta.content })}\n\n`))
                                }
                            } catch {
                                // skip malformed JSON
                            }
                        }
                    }
                    controller.enqueue(new TextEncoder().encode('data: [DONE]\n\n'))
                    controller.close()
                } catch (err) {
                    controller.error(err)
                }
            }
        })

        return new Response(stream, {
            headers: {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive'
            }
        })
    } catch (err) {
        clearTimeout(timeoutId)

        if (err.name === 'AbortError') {
            throw createError({ statusCode: 408, statusMessage: 'Request timeout' })
        }
        if (err.statusCode) {
            throw err
        }
        throw createError({ statusCode: 500, statusMessage: err.message || 'Internal server error' })
    }
})
