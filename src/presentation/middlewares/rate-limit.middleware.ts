import rateLimit from 'express-rate-limit'

interface RateLimitOptions {
    windowMs: number
    maxRequests: number
    message?: string
}

export const limiter = (options: RateLimitOptions) =>
    rateLimit({
        windowMs: options.windowMs,
        max: options.maxRequests,
        message: options.message
    })
