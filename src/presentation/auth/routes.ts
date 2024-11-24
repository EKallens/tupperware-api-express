import { Router } from 'express'
import { AuthController } from './controller'
import { AuthRepositoryImpl } from '@/infrastructure/repositories/auth/auth.repository.impl'
import { AuthDataSourceImpl } from '@/infrastructure/datasources/auth/auth.datasource.impl'
import { LoginUserUseCase } from '@/domain/use-cases/auth/login.use-case'
import { AuthUseCases } from '@/domain/interfaces/auth.interface'
import { RegisterUserUseCase } from '@/domain/use-cases/auth/register.use-case'

export class AuthRoutes {
    static get routes() {
        const router = Router()
        const authDatasourceImpl = new AuthDataSourceImpl()
        const authRepositoryImpl = new AuthRepositoryImpl(authDatasourceImpl)

        const authUseCases: AuthUseCases = {
            loginUser: new LoginUserUseCase(authRepositoryImpl),
            registerUser: new RegisterUserUseCase(authRepositoryImpl)
            //resetPassword: new ResetPasswordUseCase(userRepository),
        }
        const controller = new AuthController(authUseCases)

        router.post('/login', controller.loginUser)
        router.post('/register', controller.registerUser)

        return router
    }
}
