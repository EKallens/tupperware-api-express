import { z } from 'zod'

export const UpdateUserSchema = z.object({
    name: z.string().optional(),
    email: z.string().optional()
})

export type UpdateUserDtoType = z.infer<typeof UpdateUserSchema>
