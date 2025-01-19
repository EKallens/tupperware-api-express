export interface EmailServiceResponse {
    success: boolean
    message_ids?: string[]
}

export interface Address {
    name: string
    email: string
}

export interface IEmailService {
    sendVerificationEmail(to: string, verificationToken: string): Promise<void>
    sendForgotPasswordEmail(to: string, resetUrl: string): Promise<void>
    sendResetPasswordEmail(to: string): Promise<void>
}
