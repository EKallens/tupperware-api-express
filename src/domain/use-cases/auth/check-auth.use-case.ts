import { UserEntity } from '@/domain/entities/user.entity'
import { AuthRepository } from '@/domain/repositories/auth/auth.repository'

interface ICheckAuthUseCase {
    execute(userId: string): Promise<UserEntity>
}

export class CheckAuthUseCase implements ICheckAuthUseCase {
    constructor(private readonly authRepository: AuthRepository) {}

    async execute(userId: string): Promise<UserEntity> {
        return await this.authRepository.checkAuth(userId)
    }
}
