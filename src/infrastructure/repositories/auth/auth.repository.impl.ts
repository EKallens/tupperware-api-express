import { AuthDataSource } from '@/domain/datasources/auth/auth.datasource'
import { LoginUserDto } from '@/domain/dtos/auth/login-user.dto'
import { RegisterUserDto } from '@/domain/dtos/auth/register-user.dto'
import { UserEntity } from '@/domain/entities/user.entity'
import { AuthRepository } from '@/domain/repositories/auth/auth.repository'

export class AuthRepositoryImpl implements AuthRepository {
    constructor(private readonly authDatasource: AuthDataSource) {}

    loginUser(loginUserDto: LoginUserDto): Promise<UserEntity> {
        return this.authDatasource.loginUser(loginUserDto)
    }

    registerUser(registerUserDto: RegisterUserDto): Promise<UserEntity> {
        return this.authDatasource.registerUser(registerUserDto)
    }

    verifyEmail(token: string): Promise<void> {
        return this.authDatasource.verifyEmail(token)
    }

    forgotPassword(email: string): Promise<UserEntity> {
        return this.authDatasource.forgotPassword(email)
    }

    resetPassword(password: string, token: string): Promise<UserEntity> {
        return this.authDatasource.resetPassword(password, token)
    }

    checkAuth(userId: string): Promise<UserEntity> {
        return this.authDatasource.checkAuth(userId)
    }
}
