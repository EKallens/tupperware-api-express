import { GetUserRecipesUseCase } from '@/domain/use-cases/recipe/get-user-recipes.use-case'
import { GetRecipeUseCase } from '@/domain/use-cases/recipe/get-recipe.use-case'
import { CreateRecipeUseCase } from '@/domain/use-cases/recipe/create-recipe.use-case'
import { UpdateRecipeUseCase } from '@/domain/use-cases/recipe/update-recipe.use-case'
import { DeleteRecipeUseCase } from '@/domain/use-cases/recipe/delete-recipe.use-case'

export interface RecipeUseCases {
    createRecipe: CreateRecipeUseCase
    getRecipeById: GetRecipeUseCase
    getUserRecipes: GetUserRecipesUseCase
    updateRecipe: UpdateRecipeUseCase
    deleteRecipe: DeleteRecipeUseCase
}
