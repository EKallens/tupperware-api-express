import { Request, Response } from 'express'
import { logger } from '@/config/logger'
import { CreateRecipeDto } from '@/domain/dtos/recipe/create-recipe.dto'
import { UpdateRecipeDto } from '@/domain/dtos/recipe/update-recipe.dto'
import { CustomError } from '@/domain/errors/custom.error'
import { RecipeUseCases } from '@/domain/interfaces/recipe.interface'
import { HttpStatusCode } from '@/presentation/shared/status-codes'

export class RecipesController {
    constructor(private readonly recipeUseCases: RecipeUseCases) {}

    private handleError = (error: any, res: Response) => {
        logger.error({ message: { error: error.message }, timestamp: new Date().toISOString() })
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message })
        }

        return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: error ?? 'Internal server error' })
    }

    create = (req: Request, res: Response) => {
        const [error, createRecipeDto] = CreateRecipeDto.create(req.body)
        if (error) return res.status(HttpStatusCode.BAD_REQUEST).json({ error })

        this.recipeUseCases.createRecipe
            .execute(createRecipeDto!)
            .then((data) => res.json(data))
            .catch((error) => this.handleError(error, res))
    }

    get = (req: Request, res: Response) => {
        const { id } = req.params

        this.recipeUseCases.getRecipeById
            .execute(id)
            .then((data) => res.json(data))
            .catch((error) => this.handleError(error, res))
    }

    getUserRecipes = (req: Request, res: Response) => {
        const { id } = req.params
        const { favorites } = req.query

        this.recipeUseCases.getUserRecipes
            .execute(id, favorites === 'true' ? true : false)
            .then((data) => res.json(data))
            .catch((error) => this.handleError(error, res))
    }

    update = (req: Request, res: Response) => {
        const [error, updateRecipeDto] = UpdateRecipeDto.create(req.body)
        if (error) return res.status(HttpStatusCode.BAD_REQUEST).json({ error })
        const { id } = req.params

        this.recipeUseCases.updateRecipe
            .execute(id, updateRecipeDto!)
            .then((data) => res.json(data))
            .catch((error) => this.handleError(error, res))
    }

    delete = async (req: Request, res: Response) => {
        const { id } = req.params
        return this.recipeUseCases.deleteRecipe
            .execute(id)
            .then(() => res.json())
            .catch((error) => this.handleError(error, res))
    }

    uploadImage = (req: Request, res: Response) => {
        const imagePath = req.body.files.file[0].filepath

        this.recipeUseCases.uploadImage
            .execute(imagePath)
            .then((data) => res.json({ filePath: data }))
            .catch((error) => this.handleError(error, res))
    }
}
