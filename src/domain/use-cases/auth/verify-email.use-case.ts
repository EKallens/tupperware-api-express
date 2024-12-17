import { AuthRepository } from '@/domain/repositories/auth/auth.repository'

interface IVerifyEmailUseCase {
    execute(code: string): Promise<void>
}

export class VerifyEmailUseCase implements IVerifyEmailUseCase {
    constructor(private readonly authRepository: AuthRepository) {}

    async execute(token: string): Promise<void> {
        return await this.authRepository.verifyEmail(token)
    }
}
