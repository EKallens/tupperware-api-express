import { MailtrapClient } from 'mailtrap'
import { envs } from './envs'

const TOKEN = envs.MAILTRAP_TOKEN

export const mailtrapClient = new MailtrapClient({
    token: TOKEN
})

export const sender = {
    name: 'Tupperware App',
    email: 'hello@demomailtrap.com'
}
