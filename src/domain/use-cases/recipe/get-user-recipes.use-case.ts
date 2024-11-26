import { RecipeEntity } from '@/domain/entities/recipe.entity'
import { RecipeRepository } from '@/domain/repositories/recipe/recipe.repository'

interface IGetUserRecipesUseCase {
    execute(userId: string): Promise<RecipeEntity[]>
}

export class GetUserRecipesUseCase implements IGetUserRecipesUseCase {
    constructor(private readonly recipeRepository: RecipeRepository) {}

    execute(userId: string): Promise<RecipeEntity[]> {
        return this.recipeRepository.findUserRecipes(userId)
    }
}
