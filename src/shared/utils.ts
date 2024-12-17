import { randomBytes } from 'crypto'

export const generateVerificationToken = () => {
    return Math.floor(100000 + Math.random() * 900000).toString()
}

export const generateResetToken = () => {
    return randomBytes(20).toString('hex')
}
