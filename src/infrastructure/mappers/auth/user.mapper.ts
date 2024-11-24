import { UserEntity } from '@/domain/entities/user.entity'
import { CustomError } from '@/domain/errors/custom.error'

export class UserMapper {
    static transformObjectToUserEntity(object: { [key: string]: any }): UserEntity {
        const { _id, id, name, email, password, roles } = object

        if (!id) throw CustomError.badRequest('Id is required')
        if (!name) throw CustomError.badRequest('Name is required')
        if (!email) throw CustomError.badRequest('Email is required')
        if (!password) throw CustomError.badRequest('Password is required')
        if (!roles) throw CustomError.badRequest('Roles is required')

        return new UserEntity(_id || id, name, email, password, roles)
    }
}
