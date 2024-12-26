import { UpdateUserDto } from '@/domain/dtos/user/update-user.dto'
import { IUser } from '@/domain/interfaces/user.interface'
import { UserRepository } from '@/domain/repositories/user/user.repository'

interface IUpdateUserUseCase {
    execute(id: string, updateUserDto: UpdateUserDto): Promise<Pick<IUser, 'name' | 'email'> | null>
}

export class UpdateUserUseCase implements IUpdateUserUseCase {
    constructor(private readonly userRepository: UserRepository) {}

    async execute(id: string, updateUserDto: UpdateUserDto): Promise<Pick<IUser, 'name' | 'email'> | null> {
        return await this.userRepository.update(id, updateUserDto)
    }
}
