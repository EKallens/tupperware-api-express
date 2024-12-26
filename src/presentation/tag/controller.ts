import { Request, Response } from 'express'
import { CreateTagDto } from '@/domain/dtos/tag/create-tag.dto'
import { CustomError } from '@/domain/errors/custom.error'
import { TagUseCases } from '@/domain/interfaces/tag.interface'
import { UpdateTagDto } from '@/domain/dtos/tag/update-tag.dto'
import { logger } from '@/config/logger'
import { HttpStatusCode } from '@/presentation/shared/status-codes'

export class TagController {
    constructor(private readonly tagUseCases: TagUseCases) {}

    private handleError = (error: any, res: Response) => {
        logger.error({ message: { error: error.message }, timestamp: new Date().toISOString() })
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message })
        }

        return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: error ?? 'Internal server error' })
    }

    create = (req: Request, res: Response) => {
        const [error, createTagDto] = CreateTagDto.create(req.body)
        if (error) return res.status(HttpStatusCode.BAD_REQUEST).json({ error })

        this.tagUseCases.createTag
            .execute(createTagDto!)
            .then((data) => res.json(data))
            .catch((error) => console.log(error))
    }

    get = (req: Request, res: Response) => {
        const { id } = req.params

        this.tagUseCases.getTagById
            .execute(id)
            .then((data) => res.json(data))
            .catch((error) => this.handleError(error, res))
    }

    getTags = (req: Request, res: Response) => {
        this.tagUseCases.getAllTags
            .execute()
            .then((data) => res.json(data))
            .catch((error) => this.handleError(error, res))
    }

    update = (req: Request, res: Response) => {
        const [error, updateTagDto] = UpdateTagDto.create(req.body)
        if (error) return res.status(HttpStatusCode.BAD_REQUEST).json({ error })
        const { id } = req.params

        this.tagUseCases.updateTag
            .execute(id, updateTagDto!)
            .then((data) => res.json(data))
            .catch((error) => this.handleError(error, res))
    }

    delete = (req: Request, res: Response) => {
        const { id } = req.params

        this.tagUseCases.deleteTag
            .execute(id)
            .then(() => res.json())
            .catch((error) => this.handleError(error, res))
    }
}
