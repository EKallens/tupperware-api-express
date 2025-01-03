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
import { AuthMiddleware } from '../middlewares/auth.middleware'
import { FilesMiddleware } from '../middlewares/files.middleware'
import { UploadRecipeImageUseCase } from '@/domain/use-cases/recipe/upload-recipe-image.use-case'
import { CloudinaryService } from '@/infrastructure/services/cloudinary.service'

export class RecipesRoutes {
    static get routes() {
        const router = Router()
        const fileService = new CloudinaryService()
        const recipeDatasource = new RecipeDatasourceImpl()
        const recipeRepository = new RecipeRepositoryImpl(recipeDatasource)

        const recipeUseCases: RecipeUseCases = {
            getUserRecipes: new GetUserRecipesUseCase(recipeRepository),
            getRecipeById: new GetRecipeUseCase(recipeRepository),
            createRecipe: new CreateRecipeUseCase(recipeRepository),
            updateRecipe: new UpdateRecipeUseCase(recipeRepository),
            deleteRecipe: new DeleteRecipeUseCase(recipeRepository),
            uploadImage: new UploadRecipeImageUseCase(fileService)
        }

        const controller = new RecipesController(recipeUseCases)

        router.post('/', AuthMiddleware.validateJwt, controller.create)
        router.get('/:id', AuthMiddleware.validateJwt, AuthMiddleware.validateRecipeBelongsToUser, controller.get)
        router.get('/user/:id', AuthMiddleware.validateJwt, controller.getUserRecipes)
        router.patch('/:id', AuthMiddleware.validateJwt, AuthMiddleware.validateRecipeBelongsToUser, controller.update)
        router.delete('/:id', AuthMiddleware.validateJwt, AuthMiddleware.validateRecipeBelongsToUser, controller.delete)
        router.post('/image', AuthMiddleware.validateJwt, FilesMiddleware.generateImagePath, controller.uploadImage)

        return router
    }
}
