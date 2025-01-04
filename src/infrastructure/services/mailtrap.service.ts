import { logger } from '@/config/logger'
import { mailtrapClient, sender } from '@/config/mailtrap'
import { CustomError } from '@/domain/errors/custom.error'
import { IEmailService } from '@/domain/interfaces/email-service.interface'
import { Address, SendResponse } from 'mailtrap'
import { VERIFICATION_EMAIL_TEMPLATE } from '@/infrastructure/email/templates/verificationEmail'
import { SUCCESS_PASSWORD_RESET_TEMPLATE } from '@/infrastructure/email/templates/successPasswordResetEmail'
import { RESET_PASSWORD_EMAIL_TEMPLATE } from '@/infrastructure/email/templates/resetPasswordEmail'

export class MailtrapService implements IEmailService {
    async sendVerificationEmail(to: Address[], verificationToken: string): Promise<SendResponse> {
        const recipient = [{ name: to[0].name, email: 'e.kallensp@gmail.com' }]

        try {
            const response = await mailtrapClient.send({
                from: sender,
                to: recipient,
                subject: 'Verifica tu cuenta',
                category: 'Email Verification',
                html: VERIFICATION_EMAIL_TEMPLATE.replace('{verificationCode}', verificationToken)
            })

            logger.info(`Verification email successfully sent to ${to[0].email}`)

            return {
                success: response.success,
                message_ids: response.message_ids
            }
        } catch (error) {
            logger.error('Error sending verification email', error)
            throw CustomError.internalServer('Error sending verification email, please check the logs')
        }
    }

    async sendForgotPasswordEmail(to: Address[], resetUrl: string): Promise<SendResponse> {
        const recipient = [{ name: to[0].name, email: 'e.kallensp@gmail.com' }]

        try {
            const response = await mailtrapClient.send({
                from: sender,
                to: recipient,
                subject: 'Restablece tu contraseña',
                category: 'Forgot Password',
                html: RESET_PASSWORD_EMAIL_TEMPLATE.replace('{resetURL}', resetUrl)
            })

            logger.info(`Forgot password email successfully sent to ${to[0].email}`)

            return {
                success: response.success,
                message_ids: response.message_ids
            }
        } catch (error) {
            logger.error('Error sending forgot password email', error)
            throw CustomError.internalServer('Error sending forgot password email, please check the logs')
        }
    }

    async sendResetPasswordEmail(to: Address[]): Promise<SendResponse> {
        const recipient = [{ name: to[0].name, email: 'e.kallensp@gmail.com' }]

        try {
            const response = await mailtrapClient.send({
                from: sender,
                to: recipient,
                subject: 'Contraseña restablecida',
                category: 'Reset Password',
                html: SUCCESS_PASSWORD_RESET_TEMPLATE
            })

            logger.info(`Reset password email successfully sent to ${to[0].email}`)

            return {
                success: response.success,
                message_ids: response.message_ids
            }
        } catch (error) {
            logger.error('Error sending reset password email', error)
            throw CustomError.internalServer('Error sending reset password email, please check the logs')
        }
    }
}
