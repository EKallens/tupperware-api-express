import { CreateRecipeDto } from '@/domain/dtos/recipe/create-recipe.dto'
import { RecipeEntity } from '@/domain/entities/recipe.entity'
import { RecipeRepository } from '@/domain/repositories/recipe/recipe.repository'

interface ICreateRecipeUseCase {
    execute(createRecipeDto: CreateRecipeDto): Promise<RecipeEntity>
}

export class CreateRecipeUseCase implements ICreateRecipeUseCase {
    constructor(private readonly recipeRepository: RecipeRepository) {}

    execute(createRecipeDto: CreateRecipeDto): Promise<RecipeEntity> {
        return this.recipeRepository.create(createRecipeDto)
    }
}
