import { RecipeDatasource } from '@/domain/datasources/recipe/recipe.datasource'
import { CreateRecipeDto } from '@/domain/dtos/recipe/create-recipe.dto'
import { UpdateRecipeDto } from '@/domain/dtos/recipe/update-recipe.dto'
import { RecipeEntity } from '@/domain/entities/recipe.entity'
import { RecipeRepository } from '@/domain/repositories/recipe/recipe.repository'

export class RecipeRepositoryImpl implements RecipeRepository {
    constructor(private readonly recipeDatasource: RecipeDatasource) {}

    create(createRecipeDto: CreateRecipeDto): Promise<RecipeEntity> {
        return this.recipeDatasource.create(createRecipeDto)
    }

    findById(id: string): Promise<RecipeEntity> {
        return this.recipeDatasource.findById(id)
    }

    findUserRecipes(userId: string, favorites?: boolean): Promise<RecipeEntity[]> {
        return this.recipeDatasource.findUserRecipes(userId, favorites)
    }

    update(id: string, updateRecipeDto: UpdateRecipeDto): Promise<RecipeEntity> {
        return this.recipeDatasource.update(id, updateRecipeDto)
    }

    delete(id: string): Promise<void> {
        return this.recipeDatasource.delete(id)
    }
}
