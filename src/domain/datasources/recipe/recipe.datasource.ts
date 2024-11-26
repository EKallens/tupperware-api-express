import { CreateRecipeDto } from '@/domain/dtos/recipe/create-recipe.dto'
import { UpdateRecipeDto } from '@/domain/dtos/recipe/update-recipe.dto'
import { RecipeEntity } from '@/domain/entities/recipe.entity'

export interface RecipeDatasource {
    create: (createRecipeDto: CreateRecipeDto) => Promise<RecipeEntity>
    findById: (id: string) => Promise<RecipeEntity>
    findUserRecipes: (userId: string) => Promise<RecipeEntity[]>
    update: (id: string, updateRecipeDto: UpdateRecipeDto) => Promise<RecipeEntity>
    delete: (id: string) => Promise<void>
}
