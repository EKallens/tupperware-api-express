import { CreateRecipeDto } from '@/domain/dtos/recipe/create-recipe.dto'
import { Request, Response } from 'express'

export class RecipesController {
    constructor() {}

    create = (req: Request, res: Response) => {
        const [error, createRecipeDto] = CreateRecipeDto.create(req.body)
        if (error) return res.status(400).json({ error })

        return res.json(createRecipeDto)
    }

    getRecipe = (req: Request, res: Response) => {
        const { id } = req.params
        res.json({
            message: `Get recipe ${id}`
        })
    }

    update = (req: Request, res: Response) => {
        const { id } = req.params
        res.json({
            message: `Update recipe ${id}`
        })
    }

    delete = (req: Request, res: Response) => {
        const { id } = req.params
        res.json({
            message: `Delete recipe ${id}`
        })
    }
}
