import { BcryptAdapter } from '@/config/bcrypt'
import { logger } from '@/config/logger'
import { UserModel } from '@/data/mongodb/models/user.model'
import { AuthDataSource } from '@/domain/datasources/auth/auth.datasource'
import { LoginUserDto } from '@/domain/dtos/auth/login-user.dto'
import { RegisterUserDto } from '@/domain/dtos/auth/register-user.dto'
import { UserEntity } from '@/domain/entities/user.entity'
import { CustomError } from '@/domain/errors/custom.error'
import { UserMapper } from '@/infrastructure/mappers/auth/user.mapper'

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

        const user = await UserModel.create({
            email,
            name,
            password: this.hashPassword(password)
        })

        await user.save()

        logger.info({ message: { userCreated: email }, timestamp: new Date().toISOString() })
        return UserMapper.transformObjectToUserEntity(user)
    }
}
