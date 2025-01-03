import { IFileService } from '@/domain/interfaces/file-service.interface'

interface IUploadRecipeImageUseCase {
    execute(imgPath: string): Promise<string>
}

export class UploadRecipeImageUseCase implements IUploadRecipeImageUseCase {
    constructor(private readonly fileService: IFileService) {}

    async execute(imgPath: string): Promise<string> {
        return await this.fileService.uploadFile(imgPath)
    }
}
