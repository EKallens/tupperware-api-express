import { RecipeRepository } from '@/domain/repositories/recipe/recipe.repository'

interface IDeleteRecipeUseCase {
    execute(id: string): Promise<void>
}

export class DeleteRecipeUseCase implements IDeleteRecipeUseCase {
    constructor(private readonly recipeRepository: RecipeRepository) {}

    execute(id: string): Promise<void> {
        return this.recipeRepository.delete(id)
    }
}
