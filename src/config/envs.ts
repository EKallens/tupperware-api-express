import 'dotenv/config'
import { get } from 'env-var'

export const envs = {
    PORT: get('PORT').required().asPortNumber(),
    MONGO_URL: get('MONGO_URL').required().asString(),
    MONGO_DB_NAME: get('MONGO_DB_NAME').required().asString(),
    JWT_SEED: get('JWT_SEED').required().asString(),
    ALLOWED_ORIGINS: get('ALLOWED_ORIGINS').required().asString(),
    NODE_ENV: get('NODE_ENV').required().asString(),
    MAILTRAP_TOKEN: get('MAILTRAP_TOKEN').required().asString(),
    CLIENT_URL: get('CLIENT_URL').required().asString()
}
