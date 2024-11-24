import { LoginUserUseCase } from '@/domain/use-cases/auth/login.use-case'
import { RegisterUserUseCase } from '@/domain/use-cases/auth/register.use-case'

export interface UserToken {
    token: string
    user: {
        id: string
        email: string
        name: string
    }
}

export interface AuthUseCases {
    loginUser: LoginUserUseCase
    registerUser: RegisterUserUseCase
}
