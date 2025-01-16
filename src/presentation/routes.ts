import { Router } from 'express'
import { AuthRoutes } from './auth/routes'
import { RecipesRoutes } from './recipe/routes'
import { TagRoutes } from './tag/routes'
import { UserRoutes } from './users/routes'
import { HealthRoutes } from './health/routes'

export class AppRoutes {
    static get routes() {
        const router = Router()

        router.use('/api/auth', AuthRoutes.routes)
        router.use('/api/recipes', RecipesRoutes.routes)
        router.use('/api/tags', TagRoutes.routes)
        router.use('/api/users', UserRoutes.routes)
        router.use('/api/health', HealthRoutes.routes)

        return router
    }
}
