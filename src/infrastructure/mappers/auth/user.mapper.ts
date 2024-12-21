import { UserEntity } from '@/domain/entities/user.entity'
import { CustomError } from '@/domain/errors/custom.error'

export class UserMapper {
    static transformObjectToUserEntity(object: { [key: string]: any }, includePassword: boolean = true): UserEntity {
        const {
            _id,
            id,
            name,
            email,
            password,
            isVerified,
            verificationToken,
            resetPasswordToken,
            resetPasswordTokenExpiresAt,
            roles,
            img
        } = object

        if (!id) throw CustomError.badRequest('Id is required')
        if (!name) throw CustomError.badRequest('Name is required')
        if (!email) throw CustomError.badRequest('Email is required')
        if (!password && includePassword) throw CustomError.badRequest('Password is required')
        if (!roles) throw CustomError.badRequest('Roles is required')

        return new UserEntity(
            _id || id,
            name,
            email,
            password,
            isVerified,
            verificationToken,
            resetPasswordToken,
            resetPasswordTokenExpiresAt,
            roles,
            img
        )
    }
}
