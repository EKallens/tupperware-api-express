import { UpdateRecipeSchema } from '@/domain/schemas/updateRecipeSchema'
import { z } from 'zod'

export class UpdateRecipeDto {
    private constructor(
        public readonly title?: string,
        public readonly notes?: string,
        public readonly servings?: number,
        public readonly tags?: string[],
        public readonly ingredients?: string,
        public readonly cookTime?: number,
        public readonly preparation?: string,
        public readonly difficulty?: number,
        public readonly createdBy?: string,
        public readonly isFavorite?: boolean,
        public readonly img?: string,
        public readonly description?: string
    ) {}

    static create(object: { [key: string]: any }): [string?, UpdateRecipeDto?] {
        try {
            const dto = UpdateRecipeSchema.parse(object)
            return [undefined, dto]
        } catch (error) {
            if (error instanceof z.ZodError) {
                const errorMessages = error.errors.map((err) => err.message).join(', ')
                return [errorMessages]
            }
            return ['Unexpected error']
        }
    }
}
