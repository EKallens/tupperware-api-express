import { z } from 'zod'

export const CreateRecipeSchema = z.object({
    title: z.string().min(1),
    notes: z.string().min(1),
    servings: z.string().min(1),
    tags: z.array(z.string()),
    ingredients: z.string().min(1),
    cookTime: z.string().min(1),
    preparation: z.string().min(1),
    difficulty: z.string().min(1),
    createdBy: z.string().min(1),
    isFavorite: z.boolean().optional(),
    img: z.string().min(1).optional(),
    description: z.string().min(1).optional()
})

export type CreateRecipeDtoType = z.infer<typeof CreateRecipeSchema>
