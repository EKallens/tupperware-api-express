import { Router } from 'express'
import { RecipesController } from './controller'
import { RecipeRepositoryImpl } from '@/infrastructure/repositories/recipe/recipe.repository.impl'
import { RecipeDatasourceImpl } from '@/infrastructure/datasources/recipe/recipe.datasource.impl'
import { RecipeUseCases } from '@/domain/interfaces/recipe.interface'
import { GetUserRecipesUseCase } from '@/domain/use-cases/recipe/get-user-recipes.use-case'
import { GetRecipeUseCase } from '@/domain/use-cases/recipe/get-recipe.use-case'
import { CreateRecipeUseCase } from '@/domain/use-cases/recipe/create-recipe.use-case'
import { UpdateRecipeUseCase } from '@/domain/use-cases/recipe/update-recipe.use-case'
import { DeleteRecipeUseCase } from '@/domain/use-cases/recipe/delete-recipe.use-case'

export class RecipesRoutes {
    static get routes() {
        const router = Router()
        const recipeDatasource = new RecipeDatasourceImpl()
        const recipeRepository = new RecipeRepositoryImpl(recipeDatasource)

        const recipeUseCases: RecipeUseCases = {
            getUserRecipes: new GetUserRecipesUseCase(recipeRepository),
            getRecipeById: new GetRecipeUseCase(recipeRepository),
            createRecipe: new CreateRecipeUseCase(recipeRepository),
            updateRecipe: new UpdateRecipeUseCase(recipeRepository),
            deleteRecipe: new DeleteRecipeUseCase(recipeRepository)
        }

        const controller = new RecipesController(recipeUseCases)

        router.post('/', controller.create)
        router.get('/:id', controller.get)
        router.get('/user', controller.getUserRecipes)
        router.patch('/:id', controller.update)
        router.delete('/:id', controller.delete)

        return router
    }
}
