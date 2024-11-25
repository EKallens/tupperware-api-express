import { JwtAdapter } from '@/config/jwt'
import { UserModel } from '@/data/mongodb/models/user.model'
import { NextFunction, Request, Response } from 'express'

export class AuthMiddleware {
    static validateJwt = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const authorization = req.header('Authorization')
            if (!authorization) return res.status(401).json({ error: 'Unauthorized' })

            if (!authorization.startsWith('Bearer ')) return res.status(401).json({ error: 'Invalid bearer token' })

            const token = authorization.split(' ').at(1) || ''
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
}
