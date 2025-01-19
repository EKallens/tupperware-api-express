import { IEmailService } from '@/domain/interfaces/email-service.interface'
import { AuthRepository } from '@/domain/repositories/auth/auth.repository'

interface IResetPasswordUseCase {
    execute(password: string, token: string): Promise<void>
}

export class ResetPasswordUseCase implements IResetPasswordUseCase {
    constructor(private readonly authRepository: AuthRepository, private readonly emailService: IEmailService) {}

    async execute(password: string, token: string): Promise<void> {
        const user = await this.authRepository.resetPassword(password, token)
        await this.emailService.sendResetPasswordEmail(user.email)
    }
}
