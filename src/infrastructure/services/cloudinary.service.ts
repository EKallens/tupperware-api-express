import cloudinary from '@/config/cloudinary'
import { logger } from '@/config/logger'
import { CustomError } from '@/domain/errors/custom.error'
import { IFileService } from '@/domain/interfaces/file-service.interface'

export class CloudinaryService implements IFileService {
    async uploadFile(filePath: string): Promise<string> {
        try {
            const response = await cloudinary.uploader.upload(
                filePath,
                {
                    width: 800,
                    quality: 'auto:low',
                    crop: 'limit'
                },
                (error, result) => {
                    if (error || !result) {
                        logger.error('Error uploading the file', error)
                        throw CustomError.internalServer('Error uploading the file, please check the logs')
                    }
                }
            )

            return response.secure_url
        } catch (error) {
            logger.error('Error uploading the file', error)
            throw CustomError.internalServer('Error uploading the file, please check the logs')
        }
    }
}
