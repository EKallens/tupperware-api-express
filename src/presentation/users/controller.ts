import { Request, Response } from 'express'
import { CustomError } from '@/domain/errors/custom.error'
import { UpdateUserDto } from '@/domain/dtos/user/update-user.dto'
import { logger } from '@/config/logger'
import { HttpStatusCode } from '@/presentation/shared/status-codes'
import { UserUseCases } from '@/domain/interfaces/user.interface'

export class UserController {
    constructor(private readonly userUseCases: UserUseCases) {}

    private handleError = (error: any, res: Response) => {
        logger.error({ message: { error: error.message }, timestamp: new Date().toISOString() })
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message })
        }

        return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: error ?? 'Internal server error' })
    }

    update = (req: Request, res: Response) => {
        const [error, updateUserDto] = UpdateUserDto.create(req.body)
        if (error) return res.status(HttpStatusCode.BAD_REQUEST).json({ error })
        const { id } = req.params

        this.userUseCases.update
            .execute(id, updateUserDto!)
            .then((data) => res.json(data))
            .catch((error) => this.handleError(error, res))
    }

    uploadImage = (req: Request, res: Response) => {
        const imagePath = req.body.files.file[0].filepath
        const id = req.body.fields.id[0]

        this.userUseCases.uploadImage
            .execute(id, imagePath)
            .then((data) => res.json(data))
            .catch((error) => this.handleError(error, res))
    }
}
