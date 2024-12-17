import { Router } from 'express'
import { AuthController } from './controller'
import { AuthRepositoryImpl } from '@/infrastructure/repositories/auth/auth.repository.impl'
import { AuthDataSourceImpl } from '@/infrastructure/datasources/auth/auth.datasource.impl'
import { LoginUserUseCase } from '@/domain/use-cases/auth/login.use-case'
import { AuthUseCases } from '@/domain/interfaces/auth.interface'
import { RegisterUserUseCase } from '@/domain/use-cases/auth/register.use-case'
import { MailtrapService } from '@/infrastructure/services/mailtrap.service'
import { VerifyEmailUseCase } from '@/domain/use-cases/auth/verify-email.use-case'
import { ForgotPasswordUseCase } from '@/domain/use-cases/auth/forgot-password.use-case'
import { ResetPasswordUseCase } from '@/domain/use-cases/auth/reset-password.use-case'
import { CheckAuthUseCase } from '@/domain/use-cases/auth/check-auth.use-case'
import { AuthMiddleware } from '@/presentation/middlewares/auth.middleware'

export class AuthRoutes {
    static get routes() {
        const router = Router()
        const authDatasourceImpl = new AuthDataSourceImpl()
        const authRepositoryImpl = new AuthRepositoryImpl(authDatasourceImpl)
        const mailService = new MailtrapService()

        const authUseCases: AuthUseCases = {
            loginUser: new LoginUserUseCase(authRepositoryImpl),
            registerUser: new RegisterUserUseCase(authRepositoryImpl, mailService),
            verifyEmail: new VerifyEmailUseCase(authRepositoryImpl),
            forgotPassword: new ForgotPasswordUseCase(authRepositoryImpl, mailService),
            resetPassword: new ResetPasswordUseCase(authRepositoryImpl, mailService),
            checkAuth: new CheckAuthUseCase(authRepositoryImpl)
        }
        const controller = new AuthController(authUseCases)

        router.post('/login', controller.loginUser)
        router.post('/register', controller.registerUser)
        router.post('/verify-email', controller.verifyEmail)
        router.post('/forgot-password', controller.forgotPassword)
        router.post('/reset-password/:token', controller.resetPassword)
        router.get('/check-auth', AuthMiddleware.validateJwt, controller.checkAuth)
        router.post('/logout', controller.logout)

        return router
    }
}
