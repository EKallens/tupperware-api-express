import { CorsOptions } from 'cors'
import { envs } from './envs'
import { CustomError } from '@/domain/errors/custom.error'

const originsAllowed = envs.ALLOWED_ORIGINS.split(',')

export const corsOptions: CorsOptions = {
    origin: function (origin, callback) {
        if (originsAllowed.includes(origin!) || !origin) {
            callback(null, true)
        } else {
            callback(CustomError.badRequest('Not allowed by CORS'))
        }
    }
}
