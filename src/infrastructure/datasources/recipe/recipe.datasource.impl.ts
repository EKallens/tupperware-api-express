import { CreateRecipeDto } from '@/domain/dtos/recipe/create-recipe.dto'
import { UpdateRecipeDto } from '@/domain/dtos/recipe/update-recipe.dto'
import { RecipeEntity } from '@/domain/entities/recipe.entity'
import { RecipeDatasource } from '../../../domain/datasources/recipe/recipe.datasource'
import { RecipeModel } from '@/data/mongodb/models/recipe.model'
import { RecipeMapper } from '@/infrastructure/mappers/recipe/recipe.mapper'
import { CustomError } from '@/domain/errors/custom.error'
import { UserModel } from '@/data/mongodb/models/user.model'

export class RecipeDatasourceImpl implements RecipeDatasource {
    async create(createRecipeDto: CreateRecipeDto): Promise<RecipeEntity> {
        const {
            title,
            notes,
            servings,
            tags,
            ingredients,
            cookTime,
            preparation,
            difficulty,
            createdBy,
            isFavorite,
            img,
            description
        } = createRecipeDto
        const recipe = await RecipeModel.create({
            title,
            notes,
            servings,
            tags,
            ingredients,
            cookTime,
            preparation,
            difficulty,
            createdBy,
            isFavorite,
            img,
            description
        })

        await recipe.save()
        return RecipeMapper.transformObjectToRecipeEntity(recipe)
    }

    async findById(id: string): Promise<RecipeEntity> {
        const recipe = await RecipeModel.findById(id)
        if (!recipe) throw CustomError.notFound('Recipe not found')

        return RecipeMapper.transformObjectToRecipeEntity(recipe)
    }

    async findUserRecipes(userId: string): Promise<RecipeEntity[]> {
        const user = await UserModel.findOne({ _id: userId })
        if (!user) throw CustomError.notFound('User not found')

        const recipes = await RecipeModel.find({ createdBy: userId })
        return recipes.map(RecipeMapper.transformObjectToRecipeEntity)
    }

    async update(id: string, updateRecipeDto: UpdateRecipeDto): Promise<RecipeEntity> {
        const recipe = await RecipeModel.findOneAndUpdate({ _id: id }, updateRecipeDto, { new: true })
        return RecipeMapper.transformObjectToRecipeEntity(recipe!)
    }

    async delete(id: string): Promise<void> {
        const recipe = await RecipeModel.findOne({ id })
        if (!recipe) throw CustomError.notFound('Recipe not found')
        await RecipeModel.findByIdAndDelete(id)
    }
}
