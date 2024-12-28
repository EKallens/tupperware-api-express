import { CreateRecipeDtoType, CreateRecipeSchema } from '@/domain/schemas/recipe/createRecipe.schema'
import { z } from 'zod'

export class CreateRecipeDto {
    private constructor(
        public readonly title: string,
        public readonly notes: string,
        public readonly servings: string,
        public readonly tags: string[],
        public readonly ingredients: string,
        public readonly cookTime: string,
        public readonly preparation: string,
        public readonly difficulty: string,
        public readonly createdBy: string,
        public readonly isFavorite?: boolean,
        public readonly img?: string,
        public readonly description?: string
    ) {}

    static create(object: { [key: string]: any }): [string?, CreateRecipeDto?] {
        try {
            const dto: CreateRecipeDtoType = CreateRecipeSchema.parse(object)
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
                new CreateRecipeDto(
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
