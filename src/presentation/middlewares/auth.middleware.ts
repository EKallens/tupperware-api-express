import { JwtAdapter } from '@/config/jwt'
import { RecipeModel } from '@/data/mongodb/models/recipe.model'
import { UserModel } from '@/data/mongodb/models/user.model'
import { RecipeMapper } from '@/infrastructure/mappers/recipe/recipe.mapper'
import { NextFunction, Request, Response } from 'express'

export class AuthMiddleware {
    static validateJwt = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.cookies.token
            if (!token) return res.status(401).json({ error: 'Unauthorize - no token provided' })

            const payload = await JwtAdapter.validateToken<{ id: string }>(token)
            if (!payload) return res.status(401).json({ error: 'Invalid token' })

            const user = await UserModel.findById(payload.id)
            if (!user) return res.status(401).json({ error: 'User not found' })

            req.body.user = user
            next()
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Internal server error' })
        }
    }

    static validateRecipeBelongsToUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.cookies.token
            if (!token) return res.status(401).json({ error: 'Unauthorize - no token provided' })

            const payload = await JwtAdapter.validateToken<{ id: string }>(token)
            if (!payload) return res.status(401).json({ error: 'Invalid token' })

            const recipe = await RecipeModel.findOne({ createdBy: payload.id })
            if (RecipeMapper.transformObjectToRecipeEntity(recipe!).createdBy.toString() !== payload.id) {
                return res.status(403).json({ error: 'Forbidden' })
            }

            next()
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Internal server error' })
        }
    }
}
