import { JwtAdapter } from '@/config/jwt'
import { logger } from '@/config/logger'
import { RegisterUserDto } from '@/domain/dtos/auth/register-user.dto'
import { CustomError } from '@/domain/errors/custom.error'
import { AuthUserToken } from '@/domain/interfaces/auth.interface'
import { IEmailService } from '@/domain/interfaces/email-service.interface'
import { AuthRepository } from '@/domain/repositories/auth/auth.repository'
import type {StringValue} from "ms";

type SignToken = (payload: Object, duration?: StringValue | number) => Promise<string | null>

interface IRegisterUserUseCase {
    execute(registerUserDto: RegisterUserDto): Promise<AuthUserToken>
}

export class RegisterUserUseCase implements IRegisterUserUseCase {
    constructor(
        private readonly authRepository: AuthRepository,
        private readonly emailService: IEmailService,
        private readonly signToken: SignToken = JwtAdapter.generateToken
    ) {}

    async execute(registerUserDto: RegisterUserDto): Promise<AuthUserToken> {
        const user = await this.authRepository.registerUser(registerUserDto)
        const token = await this.signToken({ id: user.id })

        if (!token) throw CustomError.internalServer('Error generating token')
        logger.info({ message: { userRegistered: user.email }, timestamp: new Date().toISOString() })

        await this.emailService.sendVerificationEmail(user.email, user.verificationToken!)

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
