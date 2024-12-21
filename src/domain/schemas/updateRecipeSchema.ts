import { z } from 'zod'

export const UpdateRecipeSchema = z.object({
    title: z.string().optional(),
    notes: z.string().optional(),
    servings: z.number().int().positive().optional(),
    tags: z.array(z.string()).optional(),
    ingredients: z.string().optional(),
    cookTime: z.number().int().positive().optional(),
    preparation: z.string().optional(),
    difficulty: z.number().int().min(1).max(5).optional(),
    createdBy: z.string().optional(),
    isFavorite: z.boolean().optional(),
    img: z.string().optional(),
    description: z.string().optional()
})

export type UpdateRecipeDtoType = z.infer<typeof UpdateRecipeSchema>
