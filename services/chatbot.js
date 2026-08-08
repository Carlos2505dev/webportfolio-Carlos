const LOG = '[Chatbot]'

export async function getAnswer(question, t, onChunk) {
    if (!question || typeof question !== 'string' || question.trim().length === 0) {
        return { content: t('chatbot.errors.unknown'), error: true }
    }

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 35000)

    try {
        const res = await fetch('/api/chat', {
            method: 'POST',
            signal: controller.signal,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ question })
        })

        clearTimeout(timeoutId)

        if (!res.ok) {
            if (res.status === 408) {
                return { content: t('chatbot.errors.timeout'), error: true }
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
                    if (parsed.content) {
                        fullContent += parsed.content
                        onChunk?.(fullContent)
                    }
                } catch {
                    // skip malformed JSON
                }
            }
        }

        if (!fullContent) {
            return { content: t('chatbot.errors.empty'), error: true }
        }

        return { content: fullContent }
    } catch (err) {
        clearTimeout(timeoutId)

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

export const chatbotService = { getAnswer }
