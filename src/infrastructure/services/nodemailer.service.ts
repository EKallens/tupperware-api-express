import { logger } from '@/config/logger'
import { CustomError } from '@/domain/errors/custom.error'
import { IEmailService } from '@/domain/interfaces/email-service.interface'
import { VERIFICATION_EMAIL_TEMPLATE } from '@/infrastructure/email/templates/verificationEmail'
import { SUCCESS_PASSWORD_RESET_TEMPLATE } from '@/infrastructure/email/templates/successPasswordResetEmail'
import { RESET_PASSWORD_EMAIL_TEMPLATE } from '@/infrastructure/email/templates/resetPasswordEmail'
import { createTransporter } from '@/config/nodemailer'

export class NodeMailerService implements IEmailService {
    async sendVerificationEmail(to: string, verificationToken: string): Promise<void> {
        try {
            const transporter = await createTransporter()
            const mailOptions = {
                from: 'e.kallensp@gmail.com',
                to: 'e.kallensp@gmail.com',
                subject: 'Verifica tu cuenta',
                html: VERIFICATION_EMAIL_TEMPLATE.replace('{verificationCode}', verificationToken)
            }

            await transporter.sendMail(mailOptions)
            logger.info(`Verification email successfully sent to ${to}`)
        } catch (error) {
            logger.error('Error sending verification email', error)
            throw CustomError.internalServer('Error sending verification email, please check the logs')
        }
    }

    async sendForgotPasswordEmail(to: string, resetUrl: string): Promise<void> {
        try {
            const transporter = await createTransporter()
            const mailOptions = {
                from: 'e.kallensp@gmail.com',
                to,
                subject: 'Restablece tu contraseña',
                html: RESET_PASSWORD_EMAIL_TEMPLATE.replace('{resetURL}', resetUrl)
            }

            await transporter.sendMail(mailOptions)
            logger.info(`Forgot password email successfully sent to ${to}`)
        } catch (error) {
            logger.error('Error sending forgot password email', error)
            throw CustomError.internalServer('Error sending forgot password email, please check the logs')
        }
    }

    async sendResetPasswordEmail(to: string): Promise<void> {
        try {
            const transporter = await createTransporter()
            const mailOptions = {
                from: 'e.kallensp@gmail.com',
                to,
                subject: 'Contraseña restablecida',
                html: SUCCESS_PASSWORD_RESET_TEMPLATE
            }

            await transporter.sendMail(mailOptions)
            logger.info(`Reset password email successfully sent to ${to}`)
        } catch (error) {
            logger.error('Error sending reset password email', error)
            throw CustomError.internalServer('Error sending reset password email, please check the logs')
        }
    }
}
