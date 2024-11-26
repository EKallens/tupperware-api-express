import { CreateRecipeDto } from '@/domain/dtos/recipe/create-recipe.dto'
import { UpdateRecipeDto } from '@/domain/dtos/recipe/update-recipe.dto'
import { CustomError } from '@/domain/errors/custom.error'
import { RecipeUseCases } from '@/domain/interfaces/recipe.interface'
import { Request, Response } from 'express'

export class RecipesController {
    constructor(private readonly recipeUseCases: RecipeUseCases) {}

    private handleError = (error: any, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message })
        }

        return res.status(500).json({ error: 'Internal server error' })
    }

    create = (req: Request, res: Response) => {
        const [error, createRecipeDto] = CreateRecipeDto.create(req.body)
        if (error) return res.status(400).json({ error })

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
        res.json({
            message: `Get recipes`
        })
    }

    update = (req: Request, res: Response) => {
        const [error, updateRecipeDto] = UpdateRecipeDto.create(req.body)
        if (error) return res.status(400).json({ error })
        const { id } = req.params

        this.recipeUseCases.updateRecipe
            .execute(id, updateRecipeDto!)
            .then((data) => res.json(data))
            .catch((error) => this.handleError(error, res))
    }

    delete = (req: Request, res: Response) => {
        const { id } = req.params
        return this.recipeUseCases.deleteRecipe
            .execute(id)
            .then(() => res.json())
            .catch((error) => this.handleError(error, res))
    }
}
