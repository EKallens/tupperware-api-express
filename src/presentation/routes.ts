import { Router } from 'express'
import { AuthRoutes } from './auth/routes'
import { RecipesRoutes } from './recipe/routes'

export class AppRoutes {
    static get routes() {
        const router = Router()

        router.use('/api/auth', AuthRoutes.routes)
        router.use('/api/recipes', RecipesRoutes.routes)

        return router
    }
}
