import { UserDataSource } from '@/domain/datasources/user/user.datasource'
import { UpdateUserDto } from '@/domain/dtos/user/update-user.dto'
import { IUser } from '@/domain/interfaces/user.interface'
import { UserRepository } from '@/domain/repositories/user/user.repository'

export class UserRepositoryImpl implements UserRepository {
    constructor(private readonly userDatasource: UserDataSource) {}

    update(id: string, updateUserDto: UpdateUserDto): Promise<Pick<IUser, 'name' | 'email'> | null> {
        return this.userDatasource.update(id, updateUserDto)
    }
}
