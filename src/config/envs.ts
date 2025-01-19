import 'dotenv/config'
import { get } from 'env-var'

export const envs = {
    PORT: get('PORT').required().asPortNumber(),
    MONGO_URL: get('MONGO_URL').required().asString(),
    MONGO_DB_NAME: get('MONGO_DB_NAME').required().asString(),
    JWT_SEED: get('JWT_SEED').required().asString(),
    ALLOWED_ORIGINS: get('ALLOWED_ORIGINS').required().asString(),
    NODE_ENV: get('NODE_ENV').required().asString(),
    CLIENT_URL: get('CLIENT_URL').required().asString(),
    CLOUDINARY_API_KEY: get('CLOUDINARY_API_KEY').required().asString(),
    CLOUDINARY_API_SECRET: get('CLOUDINARY_API_SECRET').required().asString(),
    CLOUDINARY_CLOUD_NAME: get('CLOUDINARY_CLOUD_NAME').required().asString(),
    API_URL: get('API_URL').required().asString(),
    CRON_JOB_MINUTES: get('CRON_JOB_MINUTES').required().asIntPositive(),
    MAIL_USERNAME: get('MAIL_USERNAME').required().asString(),
    MAIL_PASSWORD: get('MAIL_PASSWORD').required().asString(),
    OAUTH_CLIENT_ID: get('OAUTH_CLIENT_ID').required().asString(),
    OAUTH_CLIENT_SECRET: get('OAUTH_CLIENT_SECRET').required().asString(),
    OAUTH_REFRESH_TOKEN: get('OAUTH_REFRESH_TOKEN').required().asString()
}
