import nodemailer from 'nodemailer'
import { google } from 'googleapis'
import { envs } from './envs'

export const createTransporter = async () => {
    const MAIL_USERNAME = envs.MAIL_USERNAME
    const MAIL_PASSWORD = envs.MAIL_PASSWORD
    const OAUTH_CLIENT_ID = envs.OAUTH_CLIENT_ID
    const OAUTH_CLIENT_SECRET = envs.OAUTH_CLIENT_SECRET
    const OAUTH_REFRESH_TOKEN = envs.OAUTH_REFRESH_TOKEN

    try {
        //const oAuth2Client = new google.auth.OAuth2(OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET)
        //oAuth2Client.setCredentials({ refresh_token: OAUTH_REFRESH_TOKEN })
        //const accessToken = await oAuth2Client.getAccessToken()

        return nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: MAIL_USERNAME,
                pass: MAIL_PASSWORD,
                clientId: OAUTH_CLIENT_ID,
                clientSecret: OAUTH_CLIENT_SECRET,
                refreshToken: OAUTH_REFRESH_TOKEN,
                accessToken: ''
                //accessToken: accessToken.token || ''
            }
        })
    } catch (error) {
        console.error('Error al configurar el transporter:', error)
        throw error
    }
}
