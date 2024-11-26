import { RecipeEntity } from '@/domain/entities/recipe.entity'
import { RecipeRepository } from '@/domain/repositories/recipe/recipe.repository'

interface IGetRecipeUseCase {
    execute(id: string): Promise<RecipeEntity>
}

export class GetRecipeUseCase implements IGetRecipeUseCase {
    constructor(private readonly recipeRepository: RecipeRepository) {}

    execute(id: string): Promise<RecipeEntity> {
        return this.recipeRepository.findById(id)
    }
}
