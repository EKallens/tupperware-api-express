import { Router } from 'express'
import { TagController } from './controller'
import { TagDatasourceImpl } from '@/infrastructure/datasources/tag/tag.datasource.impl'
import { TagRepositoryImpl } from '@/infrastructure/repositories/tag/tag.repository.impl'
import { TagUseCases } from '@/domain/interfaces/tag.interface'
import { CreateTagUseCase } from '@/domain/use-cases/tag/create-tag.use-case'
import { GetTagUseCase } from '@/domain/use-cases/tag/get-tag.use-case'
import { GetUserTagsUseCase } from '@/domain/use-cases/tag/get-user-tags.use-case'
import { UpdateTagUseCase } from '@/domain/use-cases/tag/update-tag.use-case'
import { DeleteTagUseCase } from '@/domain/use-cases/tag/delete-tag.use-case'
import { AuthMiddleware } from '@/presentation/middlewares/auth.middleware'

export class TagRoutes {
    static get routes() {
        const router = Router()
        const tagDatasourceImpl = new TagDatasourceImpl()
        const tagRepositoryImpl = new TagRepositoryImpl(tagDatasourceImpl)

        const tagUseCases: TagUseCases = {
            createTag: new CreateTagUseCase(tagRepositoryImpl),
            getTagById: new GetTagUseCase(tagRepositoryImpl),
            getUserTags: new GetUserTagsUseCase(tagRepositoryImpl),
            updateTag: new UpdateTagUseCase(tagRepositoryImpl),
            deleteTag: new DeleteTagUseCase(tagRepositoryImpl)
        }

        const controller = new TagController(tagUseCases)

        router.post('/', controller.create)
        router.get('/:id', AuthMiddleware.validateJwt, controller.get)
        router.get('/user/:id', AuthMiddleware.validateJwt, controller.getUserTags)
        router.patch('/:id', AuthMiddleware.validateJwt, controller.update)
        router.delete('/:id', AuthMiddleware.validateJwt, controller.delete)

        return router
    }
}
