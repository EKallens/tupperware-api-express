import { Request, Response } from 'express'

export class AuthController {
    static async login(req: Request, res: Response) {
        res.json({
            message: 'Login'
        })
    }

    static async register(req: Request, res: Response) {
        res.json({
            message: 'Register'
        })
    }
}
