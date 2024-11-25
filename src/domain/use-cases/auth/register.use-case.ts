import { JwtAdapter } from '@/config/jwt'
import { logger } from '@/config/logger'
import { RegisterUserDto } from '@/domain/dtos/auth/register-user.dto'
import { CustomError } from '@/domain/errors/custom.error'
import { UserToken } from '@/domain/interfaces/auth.interface'
import { AuthRepository } from '@/domain/repositories/auth/auth.repository'

type SignToken = (payload: Object, duration?: string) => Promise<string | null>

interface IRegisterUserUseCase {
    execute(registerUserDto: RegisterUserDto): Promise<UserToken>
}

export class RegisterUserUseCase implements IRegisterUserUseCase {
    constructor(
        private readonly authRepository: AuthRepository,
        private readonly signToken: SignToken = JwtAdapter.generateToken
    ) {}

    async execute(registerUserDto: RegisterUserDto): Promise<UserToken> {
        const user = await this.authRepository.registerUser(registerUserDto)
        const token = await this.signToken({ id: user.id })

        if (!token) throw CustomError.internalServer('Error generating token')
        logger.info({ message: { userRegistered: user.email }, timestamp: new Date().toISOString() })

        return {
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        }
    }
}
