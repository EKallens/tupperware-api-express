import { RecipeEntity } from '@/domain/entities/recipe.entity'
import { CustomError } from '@/domain/errors/custom.error'

export class RecipeMapper {
    static transformObjectToRecipeEntity(object: { [key: string]: any }) {
        const {
            _id,
            id,
            title,
            notes,
            servings,
            tags,
            ingredients,
            cookTime,
            preparation,
            difficulty,
            createdBy,
            createdAt,
            updatedAt,
            isFavorite,
            img,
            description
        } = object

        if (!_id) throw CustomError.badRequest('Id is required')
        if (!title) throw CustomError.badRequest('Title is required')
        if (!notes) throw CustomError.badRequest('Notes is required')
        if (!servings) throw CustomError.badRequest('Servings is required')
        if (!tags) throw CustomError.badRequest('Tags is required')
        if (!ingredients) throw CustomError.badRequest('Ingredients is required')
        if (!cookTime) throw CustomError.badRequest('Cook time is required')
        if (!preparation) throw CustomError.badRequest('Preparation is required')
        if (!difficulty) throw CustomError.badRequest('Difficulty is required')
        if (!createdBy) throw CustomError.badRequest('Created by is required')

        return new RecipeEntity(
            _id || id,
            title,
            notes,
            servings,
            tags,
            ingredients,
            cookTime,
            preparation,
            difficulty,
            createdBy,
            createdAt,
            updatedAt,
            isFavorite,
            img,
            description
        )
    }
}
