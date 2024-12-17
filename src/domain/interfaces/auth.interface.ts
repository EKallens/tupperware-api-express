import { LoginUserUseCase } from '@/domain/use-cases/auth/login.use-case'
import { RegisterUserUseCase } from '@/domain/use-cases/auth/register.use-case'
import { VerifyEmailUseCase } from '@/domain/use-cases/auth/verify-email.use-case'
import { ForgotPasswordUseCase } from '@/domain/use-cases/auth/forgot-password.use-case'
import { ResetPasswordUseCase } from '@/domain/use-cases/auth/reset-password.use-case'
import { CheckAuthUseCase } from '@/domain/use-cases/auth/check-auth.use-case'

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
    verifyEmail: VerifyEmailUseCase
    forgotPassword: ForgotPasswordUseCase
    resetPassword: ResetPasswordUseCase
    checkAuth: CheckAuthUseCase
}
