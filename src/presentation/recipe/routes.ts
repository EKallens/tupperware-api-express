import { Router } from 'express'
import { RecipesController } from './controller'

export class RecipesRoutes {
    static get routes() {
        const router = Router()

        router.get('/:id', RecipesController.getRecipe)
        router.post('/', RecipesController.create)
        router.patch('/:id', RecipesController.update)
        router.delete('/:id', RecipesController.delete)

        return router
    }
}
