import { BcryptAdapter } from '@/config/bcrypt'
import { UserModel } from '@/data/mongodb/models/user.model'
import { AuthDataSource } from '@/domain/datasources/auth/auth.datasource'
import { LoginUserDto } from '@/domain/dtos/auth/login-user.dto'
import { RegisterUserDto } from '@/domain/dtos/auth/register-user.dto'
import { UserEntity } from '@/domain/entities/user.entity'
import { CustomError } from '@/domain/errors/custom.error'
import { UserMapper } from '@/infrastructure/mappers/auth/user.mapper'
import { generateResetToken, generateVerificationToken } from '@/shared/utils'

type HashPassword = (password: string) => string
type CompareFunction = (password: string, hashedPassword: string) => boolean

export class AuthDataSourceImpl implements AuthDataSource {
    constructor(
        private readonly hashPassword: HashPassword = BcryptAdapter.hash,
        private readonly comparePassword: CompareFunction = BcryptAdapter.compare
    ) {}

    async loginUser(loginUserDto: LoginUserDto): Promise<UserEntity> {
        const { email, password } = loginUserDto
        try {
            const user = await UserModel.findOne({ email })
            if (!user) throw CustomError.badRequest('Bad credentials')

            const isPasswordValid = this.comparePassword(password, user.password)
            if (!isPasswordValid) throw CustomError.badRequest('Bad credentials')

            return UserMapper.transformObjectToUserEntity(user)
        } catch (error) {
            if (error instanceof CustomError) throw error
            throw CustomError.internalServer()
        }
    }

    async registerUser(registerUserDto: RegisterUserDto): Promise<UserEntity> {
        const { email, name, password } = registerUserDto
        const userExist = await UserModel.findOne({ email })
        if (userExist) throw CustomError.badRequest('User already exists')
        const verificationToken = generateVerificationToken()

        const user = await UserModel.create({
            email,
            name,
            password: this.hashPassword(password),
            verificationToken,
            verificationTokenExpiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
        })

        await user.save()
        return UserMapper.transformObjectToUserEntity(user)
    }

    async verifyEmail(token: string): Promise<void> {
        const user = await UserModel.findOne({
            verificationToken: token,
            verificationTokenExpiresAt: { $gt: new Date() }
        })

        if (!user) throw CustomError.badRequest('Invalid or expired verification token')

        user.isVerified = true
        user.verificationToken = undefined
        user.verificationTokenExpiresAt = undefined
        await user.save()
    }

    async forgotPassword(email: string): Promise<UserEntity> {
        const user = await UserModel.findOne({ email })
        if (!user) throw CustomError.badRequest('User not found')

        const resetToken = generateResetToken()
        const resetTokenExpiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000)

        user.resetPasswordToken = resetToken
        user.resetPasswordExpiresAt = resetTokenExpiresAt

        await user.save()
        return UserMapper.transformObjectToUserEntity(user)
    }

    async resetPassword(password: string, token: string): Promise<UserEntity> {
        const user = await UserModel.findOne({
            resetPasswordToken: token,
            resetPasswordExpiresAt: { $gt: new Date() }
        })

        if (!user) throw CustomError.badRequest('Invalid or expired reset token')

        user.password = this.hashPassword(password)
        user.resetPasswordToken = undefined
        user.resetPasswordExpiresAt = undefined

        await user.save()
        return UserMapper.transformObjectToUserEntity(user)
    }

    async checkAuth(id: string): Promise<UserEntity> {
        const user = await UserModel.findOne({ _id: id }).select('-password')
        if (!user) throw CustomError.badRequest('User not found')

        return UserMapper.transformObjectToUserEntity(user, false)
    }
}
