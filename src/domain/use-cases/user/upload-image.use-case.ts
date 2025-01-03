import { IFileService } from '@/domain/interfaces/file-service.interface'
import { UserRepository } from '../../repositories/user/user.repository'
import { IUser } from '@/domain/interfaces/user.interface'

interface IUploadImageUseCase {
    execute(id: string, image: string): Promise<IUser>
}

export class UploadImageUseCase implements IUploadImageUseCase {
    constructor(private readonly userRepository: UserRepository, private readonly fileService: IFileService) {}

    async execute(id: string, img: string): Promise<IUser> {
        const imageUrl = await this.fileService.uploadFile(img)
        return await this.userRepository.uploadImage(id, imageUrl)
    }
}
