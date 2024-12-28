import { z } from 'zod'

export const UpdateRecipeSchema = z.object({
    title: z.string().optional(),
    notes: z.string().optional(),
    servings: z.string().min(1),
    tags: z.array(z.string()).optional(),
    ingredients: z.string().optional(),
    cookTime: z.string().min(1),
    preparation: z.string().optional(),
    difficulty: z.string().min(1),
    createdBy: z.string().optional(),
    isFavorite: z.boolean().optional(),
    img: z.string().optional(),
    description: z.string().optional()
})

export type UpdateRecipeDtoType = z.infer<typeof UpdateRecipeSchema>
