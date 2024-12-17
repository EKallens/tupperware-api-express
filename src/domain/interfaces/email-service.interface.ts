export interface EmailServiceResponse {
    success: boolean
    message_ids?: string[]
}

export interface Address {
    name: string
    email: string
}

export interface IEmailService {
    sendVerificationEmail(to: Address[], verificationToken: string): Promise<EmailServiceResponse>
    sendForgotPasswordEmail(to: Address[], resetUrl: string): Promise<EmailServiceResponse>
    sendResetPasswordEmail(to: Address[]): Promise<EmailServiceResponse>
}
