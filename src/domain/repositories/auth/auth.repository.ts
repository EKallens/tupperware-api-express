import { LoginUserDto } from '@/domain/dtos/auth/login-user.dto'
import { RegisterUserDto } from '@/domain/dtos/auth/register-user.dto'
import { UserEntity } from '@/domain/entities/user.entity'

export interface AuthRepository {
    loginUser: (loginUserDto: LoginUserDto) => Promise<UserEntity>
    registerUser: (registerUserDto: RegisterUserDto) => Promise<UserEntity>
}
