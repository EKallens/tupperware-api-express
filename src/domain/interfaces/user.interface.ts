import { UpdateUserUseCase } from '@/domain/use-cases/user/update-user.use-case'
import { UploadImageUseCase } from '@/domain/use-cases/user/upload-image.use-case'

export interface IUser {
    id: string
    email: string
    name: string
    isVerified: boolean
    img?: string
}

export interface UserUseCases {
    update: UpdateUserUseCase
    uploadImage: UploadImageUseCase
}
