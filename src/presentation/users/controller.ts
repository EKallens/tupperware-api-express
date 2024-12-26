import { Request, Response } from 'express'
import { CustomError } from '@/domain/errors/custom.error'
import { UpdateUserUseCase } from '@/domain/use-cases/user/update-user.use-case'
import { UpdateUserDto } from '@/domain/dtos/user/update-user.dto'
import { logger } from '@/config/logger'
import { HttpStatusCode } from '@/presentation/shared/status-codes'

export class UserController {
    constructor(private readonly updateUserUseCase: UpdateUserUseCase) {}

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

        this.updateUserUseCase
            .execute(id, updateUserDto!)
            .then((data) => res.json(data))
            .catch((error) => this.handleError(error, res))
    }
}
