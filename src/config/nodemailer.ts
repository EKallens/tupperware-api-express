import nodemailer from 'nodemailer'
import { envs } from './envs'
import axios from 'axios'

export const createTransporter = async () => {
    const MAIL_USERNAME = envs.MAIL_USERNAME
    const MAIL_PASSWORD = envs.MAIL_PASSWORD
    const OAUTH_CLIENT_ID = envs.OAUTH_CLIENT_ID
    const OAUTH_CLIENT_SECRET = envs.OAUTH_CLIENT_SECRET
    const OAUTH_REFRESH_TOKEN = envs.OAUTH_REFRESH_TOKEN

    try {
        const accessToken = await getAccessToken(OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET, OAUTH_REFRESH_TOKEN)

        return nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: MAIL_USERNAME,
                pass: MAIL_PASSWORD,
                clientId: OAUTH_CLIENT_ID,
                clientSecret: OAUTH_CLIENT_SECRET,
                refreshToken: OAUTH_REFRESH_TOKEN,
                accessToken: accessToken || ''
            }
        })
    } catch (error) {
        console.error('Error al configurar el transporter:', error)
        throw error
    }
}

async function getAccessToken(clientId: string, clientSecret: string, refreshToken: string) {
    const response = await axios.post(
        'https://oauth2.googleapis.com/token',
        {
            client_id: clientId,
            client_secret: clientSecret,
            refresh_token: refreshToken,
            grant_type: 'refresh_token'
        },
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
    )
    return response.data.access_token
}
