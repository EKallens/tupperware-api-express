import { LoginUserDto } from '@/domain/dtos/auth/login-user.dto'
import { RegisterUserDto } from '@/domain/dtos/auth/register-user.dto'
import { UserEntity } from '@/domain/entities/user.entity'

export interface AuthRepository {
    loginUser(loginUserDto: LoginUserDto): Promise<UserEntity>
    registerUser(registerUserDto: RegisterUserDto): Promise<UserEntity>
    verifyEmail(token: string): Promise<void>
    forgotPassword(email: string): Promise<UserEntity>
    resetPassword(password: string, token: string): Promise<UserEntity>
    checkAuth(userId: string): Promise<UserEntity>
}
