import { UserModel } from '@/data/mongodb/models/user.model'
import { isObjectIdValid } from '@/data/mongodb/utils/objectIdValidator'
import { UserDataSource } from '@/domain/datasources/user/user.datasource'
import { UpdateUserDto } from '@/domain/dtos/user/update-user.dto'
import { CustomError } from '@/domain/errors/custom.error'
import { IUser } from '@/domain/interfaces/user.interface'

export class UserDatasourceImpl implements UserDataSource {
    async update(id: string, updateUserDto: UpdateUserDto): Promise<Pick<IUser, 'name' | 'email'> | null> {
        const { name, email } = updateUserDto
        if (!isObjectIdValid(id)) throw CustomError.badRequest('El id no es válido')

        const user = await UserModel.findById(id)
        if (!user) throw CustomError.notFound('El usuario no existe')
        return await UserModel.findOneAndUpdate({ _id: id }, { name, email }, { new: true }).select('id name email')
    }
}
