import { envs } from '@/config/envs'
import { IEmailService } from '@/domain/interfaces/email-service.interface'
import { AuthRepository } from '@/domain/repositories/auth/auth.repository'

interface IForgetPasswordUseCase {
    execute(email: string): Promise<void>
}

export class ForgotPasswordUseCase implements IForgetPasswordUseCase {
    constructor(private readonly authRepository: AuthRepository, private readonly emailService: IEmailService) {}

    async execute(email: string): Promise<void> {
        const user = await this.authRepository.forgotPassword(email)
        const clientUrl = envs.CLIENT_URL

        await this.emailService.sendForgotPasswordEmail(
            user.email,
            `${clientUrl}/auth/reset-password/${user.resetPasswordToken}`
        )
    }
}
