import { CreateRecipeDto } from '@/domain/dtos/recipe/create-recipe.dto'
import { UpdateRecipeDto } from '@/domain/dtos/recipe/update-recipe.dto'
import { RecipeEntity } from '@/domain/entities/recipe.entity'
import { RecipeDatasource } from '@/domain/datasources/recipe/recipe.datasource'
import { RecipeModel } from '@/data/mongodb/models/recipe.model'
import { RecipeMapper } from '@/infrastructure/mappers/recipe/recipe.mapper'
import { CustomError } from '@/domain/errors/custom.error'
import { UserModel } from '@/data/mongodb/models/user.model'
import { isObjectIdValid } from '@/data/mongodb/utils/objectIdValidator'

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
        const recipe = await RecipeModel.findOne({ _id: id })
        if (!recipe) throw CustomError.notFound('La receta no existe')

        return RecipeMapper.transformObjectToRecipeEntity(recipe)
    }

    async findUserRecipes(userId: string): Promise<RecipeEntity[]> {
        if (!isObjectIdValid(userId)) throw CustomError.badRequest('El id no es válido')
        const user = await UserModel.findOne({ _id: userId })
        if (!user) throw CustomError.notFound('El usuario no existe')

        const recipes = await RecipeModel.find({ createdBy: userId })
            .populate({
                path: 'tags',
                select: 'name'
            })
            .lean()

        // Remove the change _id to id in the tags array
        const recipesObject = recipes.map((recipe) => ({
            ...recipe,
            tags: recipe.tags.map((tag) => {
                const { _id, ...rest } = tag
                return { id: _id, ...rest }
            })
        }))

        return recipesObject.map(RecipeMapper.transformObjectToRecipeEntity)
    }

    async update(id: string, updateRecipeDto: UpdateRecipeDto): Promise<RecipeEntity> {
        const recipe = await RecipeModel.findOneAndUpdate({ _id: id }, updateRecipeDto, { new: true })
        return RecipeMapper.transformObjectToRecipeEntity(recipe!)
    }

    async delete(id: string): Promise<void> {
        const recipe = await RecipeModel.findOne({ _id: id })
        if (!recipe) throw CustomError.notFound('La receta no existe')
        await RecipeModel.findByIdAndDelete(id)
    }
}
