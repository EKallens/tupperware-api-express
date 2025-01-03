import { Router } from 'express'
import { UserController } from './controller'
import { AuthMiddleware } from '@/presentation/middlewares/auth.middleware'
import { UpdateUserUseCase } from '@/domain/use-cases/user/update-user.use-case'
import { UserDatasourceImpl } from '@/infrastructure/datasources/user/user.datasource.impl'
import { UserRepositoryImpl } from '@/infrastructure/repositories/user/user.repository.impl'
import { UserUseCases } from '@/domain/interfaces/user.interface'
import { UploadImageUseCase } from '@/domain/use-cases/user/upload-image.use-case'
import { FilesMiddleware } from '../middlewares/files.middleware'
import { CloudinaryService } from '@/infrastructure/services/cloudinary.service'

export class UserRoutes {
    static get routes() {
        const router = Router()
        const fileService = new CloudinaryService()
        const userDatasourceImpl = new UserDatasourceImpl()
        const userRepositoryImpl = new UserRepositoryImpl(userDatasourceImpl)

        const updateUserUseCase = new UpdateUserUseCase(userRepositoryImpl)
        const uploadImageUseCase = new UploadImageUseCase(userRepositoryImpl, fileService)

        const userUseCases: UserUseCases = {
            update: updateUserUseCase,
            uploadImage: uploadImageUseCase
        }

        const controller = new UserController(userUseCases)

        router.patch('/:id', AuthMiddleware.validateJwt, controller.update)
        router.post('/image', AuthMiddleware.validateJwt, FilesMiddleware.generateImagePath, controller.uploadImage)

        return router
    }
}
