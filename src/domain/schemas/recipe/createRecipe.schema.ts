import { z } from 'zod'

export const CreateRecipeSchema = z.object({
    title: z.string(),
    notes: z.string(),
    servings: z.number().int().positive(),
    tags: z.array(z.string()),
    ingredients: z.string(),
    cookTime: z.number().int().positive(),
    preparation: z.string(),
    difficulty: z.number().int().min(1).max(3),
    createdBy: z.string(),
    isFavorite: z.boolean().optional(),
    img: z.string().optional(),
    description: z.string().optional()
})

export type CreateRecipeDtoType = z.infer<typeof CreateRecipeSchema>
