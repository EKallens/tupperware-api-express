import { Router } from 'express'
import { UserController } from './controller'
import { AuthMiddleware } from '@/presentation/middlewares/auth.middleware'
import { UpdateUserUseCase } from '@/domain/use-cases/user/update-user.use-case'
import { UserDatasourceImpl } from '@/infrastructure/datasources/user/user.datasource.impl'
import { UserRepositoryImpl } from '@/infrastructure/repositories/user/user.repository.impl'

export class UserRoutes {
    static get routes() {
        const router = Router()
        const userDatasourceImpl = new UserDatasourceImpl()
        const userRepositoryImpl = new UserRepositoryImpl(userDatasourceImpl)

        const updateUserUseCase = new UpdateUserUseCase(userRepositoryImpl)

        const controller = new UserController(updateUserUseCase)

        router.patch('/:id', AuthMiddleware.validateJwt, controller.update)

        return router
    }
}
