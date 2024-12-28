import { UpdateRecipeDtoType, UpdateRecipeSchema } from '@/domain/schemas/recipe/updateRecipe.schema'
import { z } from 'zod'

export class UpdateRecipeDto {
    private constructor(
        public readonly title?: string,
        public readonly notes?: string,
        public readonly servings?: string,
        public readonly tags?: string[],
        public readonly ingredients?: string,
        public readonly cookTime?: string,
        public readonly preparation?: string,
        public readonly difficulty?: string,
        public readonly createdBy?: string,
        public readonly isFavorite?: boolean,
        public readonly img?: string,
        public readonly description?: string
    ) {}

    static create(object: { [key: string]: any }): [string?, UpdateRecipeDto?] {
        try {
            const dto: UpdateRecipeDtoType = UpdateRecipeSchema.parse(object)
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
            } = dto
            return [
                undefined,
                new UpdateRecipeDto(
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
                )
            ]
        } catch (error) {
            if (error instanceof z.ZodError) {
                const errorMessages = error.errors.map((err) => err.message).join(', ')
                return [errorMessages]
            }
            return ['Unexpected error']
        }
    }
}
