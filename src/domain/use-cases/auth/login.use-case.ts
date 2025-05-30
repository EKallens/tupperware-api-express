import { JwtAdapter } from '@/config/jwt'
import { logger } from '@/config/logger'
import { LoginUserDto } from '@/domain/dtos/auth/login-user.dto'
import { CustomError } from '@/domain/errors/custom.error'
import { AuthUserToken } from '@/domain/interfaces/auth.interface'
import { AuthRepository } from '@/domain/repositories/auth/auth.repository'
import type {StringValue} from "ms";

type SignToken = (payload: Object, duration?: StringValue | number) => Promise<string | null>
interface ILoginUserUseCase {
    execute(loginUserDto: LoginUserDto): Promise<AuthUserToken>
}

export class LoginUserUseCase implements ILoginUserUseCase {
    constructor(
        private readonly authRepository: AuthRepository,
        private readonly signToken: SignToken = JwtAdapter.generateToken
    ) {}

    async execute(loginUserDto: LoginUserDto): Promise<AuthUserToken> {
        const user = await this.authRepository.loginUser(loginUserDto)
        const token = await this.signToken({ id: user.id })

        if (!token) throw CustomError.internalServer('Error generating token')

        logger.info({ message: { userLogged: user.email }, timestamp: new Date().toISOString() })
        return {
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                isVerified: user.isVerified
            }
        }
    }
}
