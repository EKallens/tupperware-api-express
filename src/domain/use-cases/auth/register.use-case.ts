import { RegisterUserDto } from '@/domain/dtos/auth/register-user.dto'
import { UserToken } from '@/domain/interfaces/auth.interface'
import { AuthRepository } from '@/domain/repositories/auth/auth.repository'

interface IRegisterUserUseCase {
    execute(registerUserDto: RegisterUserDto): Promise<UserToken>
}

export class RegisterUserUseCase implements IRegisterUserUseCase {
    constructor(private readonly authRepository: AuthRepository) {}

    async execute(registerUserDto: RegisterUserDto): Promise<UserToken> {
        const user = await this.authRepository.registerUser(registerUserDto)

        //TODO: Implement token generation

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
