import { UserModel } from '@/data/mongodb/models/user.model'
import { isObjectIdValid } from '@/data/mongodb/utils/objectIdValidator'
import { UserDataSource } from '@/domain/datasources/user/user.datasource'
import { UpdateUserDto } from '@/domain/dtos/user/update-user.dto'
import { CustomError } from '@/domain/errors/custom.error'
import { IUser } from '@/domain/interfaces/user.interface'
import { UserMapper } from '@/infrastructure/mappers/auth/user.mapper'

export class UserDatasourceImpl implements UserDataSource {
    async update(id: string, updateUserDto: UpdateUserDto): Promise<Pick<IUser, 'name' | 'email' | 'img'> | null> {
        const { name, email, img } = updateUserDto
        if (!isObjectIdValid(id)) throw CustomError.badRequest('El id no es válido')

        const user = await UserModel.findById(id)
        if (!user) throw CustomError.notFound('El usuario no existe')
        return await UserModel.findOneAndUpdate({ _id: id }, { name, email, img }, { new: true }).select(
            'id name email'
        )
    }

    async uploadImage(id: string, img: string): Promise<IUser> {
        if (!isObjectIdValid(id)) throw CustomError.badRequest('El id no es válido')

        const user = await UserModel.findById(id)
        if (!user) throw CustomError.notFound('El usuario no existe')
        user.img = img
        await user.save()
        return UserMapper.transformObjectToUserEntity(user, false)
    }
}
