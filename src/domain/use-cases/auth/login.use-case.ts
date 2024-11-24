import { logger } from '@/config/logger'
import { LoginUserDto } from '@/domain/dtos/auth/login-user.dto'
import { CustomError } from '@/domain/errors/custom.error'
import { UserToken } from '@/domain/interfaces/auth.interface'
import { AuthRepository } from '@/domain/repositories/auth/auth.repository'

interface ILoginUserUseCase {
    execute(loginUserDto: LoginUserDto): Promise<UserToken>
}

export class LoginUserUseCase implements ILoginUserUseCase {
    constructor(private readonly authRepository: AuthRepository) {}

    async execute(loginUserDto: LoginUserDto): Promise<UserToken> {
        const user = await this.authRepository.loginUser(loginUserDto)
        logger.info({ message: { userLogged: user.email }, timestamp: new Date().toISOString() })
        return {
            token: '',
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        }
    }
}
