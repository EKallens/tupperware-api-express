import { UpdateRecipeDto } from '@/domain/dtos/recipe/update-recipe.dto'
import { RecipeEntity } from '@/domain/entities/recipe.entity'
import { RecipeRepository } from '@/domain/repositories/recipe/recipe.repository'

interface IUpdateRecipeUseCase {
    execute(id: string, updateRecipeDto: UpdateRecipeDto): Promise<RecipeEntity>
}

export class UpdateRecipeUseCase implements IUpdateRecipeUseCase {
    constructor(private readonly recipeRepository: RecipeRepository) {}

    async execute(id: string, updateRecipeDto: UpdateRecipeDto): Promise<RecipeEntity> {
        return await this.recipeRepository.update(id, updateRecipeDto)
    }
}
