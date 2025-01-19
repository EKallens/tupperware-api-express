import nodemailer from 'nodemailer'
import { google } from 'googleapis'
import { envs } from './envs'

// export const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: envs.MAIL_USERNAME,
//         pass: envs.MAIL_PASSWORD,
//         clientId: envs.OAUTH_CLIENT_ID,
//         clientSecret: envs.OAUTH_CLIENT_SECRET,
//         refreshToken: envs.OAUTH_REFRESH_TOKEN,
//         accessToken:
//             'ya29.a0ARW5m75YOYL-4MTp_4TcFzqJCeyetEzozcXOAiFTKnoJITqc2eeZnyl7pBnkfvD9P4eb4nj4edtO48BMiRfwzux9ufuG9di6-xUJkV3G4jNamAmSEEZKK9gOaBm0ehy-GFFXJhKbdsUwWsGMRrKYZepOLCSQ300_kDJ2H12AaCgYKAbISARISFQHGX2MiIqvW12P7KHduLKcHFClQPA0175'
//     }
// })

const MAIL_USERNAME = envs.MAIL_USERNAME
const MAIL_PASSWORD = envs.MAIL_PASSWORD
const OAUTH_CLIENT_ID = envs.OAUTH_CLIENT_ID
const OAUTH_CLIENT_SECRET = envs.OAUTH_CLIENT_SECRET
const OAUTH_REFRESH_TOKEN = envs.OAUTH_REFRESH_TOKEN

const oAuth2Client = new google.auth.OAuth2(OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET)
oAuth2Client.setCredentials({ refresh_token: OAUTH_REFRESH_TOKEN })

export const createTransporter = async () => {
    try {
        const accessToken = await oAuth2Client.getAccessToken()

        return nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: MAIL_USERNAME,
                pass: MAIL_PASSWORD,
                clientId: OAUTH_CLIENT_ID,
                clientSecret: OAUTH_CLIENT_SECRET,
                refreshToken: OAUTH_REFRESH_TOKEN,
                accessToken: accessToken.token || ''
            }
        })
    } catch (error) {
        console.error('Error al configurar el transporter:', error)
        throw error
    }
}
