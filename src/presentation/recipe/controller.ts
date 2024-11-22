import { Request, Response } from 'express'

export class RecipesController {
    static async create(req: Request, res: Response) {
        res.json({
            message: 'Create recipe'
        })
    }

    static getRecipe(req: Request, res: Response) {
        const { id } = req.params
        res.json({
            message: `Get recipe ${id}`
        })
    }

    static async update(req: Request, res: Response) {
        const { id } = req.params
        res.json({
            message: `Update recipe ${id}`
        })
    }

    static async delete(req: Request, res: Response) {
        const { id } = req.params
        res.json({
            message: `Delete recipe ${id}`
        })
    }
}
