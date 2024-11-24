import { Router } from 'express'
import { RecipesController } from './controller'

export class RecipesRoutes {
    static get routes() {
        const router = Router()
        const controller = new RecipesController()

        router.get('/:id', controller.getRecipe)
        router.post('/', controller.create)
        router.patch('/:id', controller.update)
        router.delete('/:id', controller.delete)

        return router
    }
}
