import { UpdateUserSchema } from '@/domain/schemas/user/updateUser.schema'
import { z } from 'zod'

export class UpdateUserDto {
    private constructor(public name?: string, public email?: string, public img?: string) {}

    static create(updateUserDto: UpdateUserDto): [string?, UpdateUserDto?] {
        try {
            const dto: UpdateUserDto = UpdateUserSchema.parse(updateUserDto)
            const { name, email } = dto
            return [undefined, new UpdateUserDto(name, email)]
        } catch (error) {
            if (error instanceof z.ZodError) {
                const errorMessages = error.errors.map((err) => err.message).join(', ')
                return [errorMessages]
            }
            return ['Unexpected error']
        }
    }
}
