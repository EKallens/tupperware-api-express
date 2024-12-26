import { UpdateUserDto } from '@/domain/dtos/user/update-user.dto'
import { IUser } from '@/domain/interfaces/user.interface'

export interface UserRepository {
    update(id: string, updateUserDto: UpdateUserDto): Promise<Pick<IUser, 'name' | 'email'> | null>
}
