import { getRequestIP, createError, setHeader } from 'h3'

const buckets = new Map()

const DEFAULT_WINDOW_MS = 60 * 1000
const DEFAULT_LIMIT = 10
const MAX_BUCKETS = 10000

function sweepExpired(now) {
    if (buckets.size <= MAX_BUCKETS) return
    for (const [key, bucket] of buckets) {
        if (now >= bucket.resetAt) buckets.delete(key)
    }
}

export function createRateLimiter({ windowMs = DEFAULT_WINDOW_MS, limit = DEFAULT_LIMIT } = {}) {
    return function checkRateLimit(event) {
        const ip = getRequestIP(event, { xForwardedFor: true }) || 'unknown'
        const now = Date.now()

        sweepExpired(now)

        const bucket = buckets.get(ip)
        const resetAt = now + windowMs

        if (!bucket || now >= bucket.resetAt) {
            buckets.set(ip, { count: 1, resetAt })
            return {
                ip,
                limit,
                remaining: limit - 1,
                resetAt,
                headers: {
                    'X-RateLimit-Limit': String(limit),
                    'X-RateLimit-Remaining': String(limit - 1),
                    'X-RateLimit-Reset': String(Math.ceil(resetAt / 1000))
                }
            }
        }

        bucket.count++

        if (bucket.count > limit) {
            setHeader(event, 'Retry-After', String(Math.ceil((bucket.resetAt - now) / 1000)))
            throw createError({
                statusCode: 429,
                statusMessage: 'Too many requests'
            })
        }

        return {
            ip,
            limit,
            remaining: limit - bucket.count,
            resetAt: bucket.resetAt,
            headers: {
                'X-RateLimit-Limit': String(limit),
                'X-RateLimit-Remaining': String(limit - bucket.count),
                'X-RateLimit-Reset': String(Math.ceil(bucket.resetAt / 1000))
            }
        }
    }
}