import { Request, Response } from 'express'
import { RegisterUserDto } from '@/domain/dtos/auth/register-user.dto'
import { LoginUserDto } from '@/domain/dtos/auth/login-user.dto'
import { AuthUseCases } from '@/domain/interfaces/auth.interface'
import { CustomError } from '@/domain/errors/custom.error'

export class AuthController {
    constructor(private readonly authUseCases: AuthUseCases) {}

    private handleError = (error: any, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message })
        }

        return res.status(500).json({ error: 'Internal server error' })
    }

    loginUser = async (req: Request, res: Response) => {
        const { email, password } = req.body
        const [error, loginUserDto] = LoginUserDto.create(email, password)
        if (error) return res.status(400).json({ error })

        await this.authUseCases.loginUser
            .execute(loginUserDto!)
            .then((data) => res.json(data))
            .catch((error) => this.handleError(error, res))
    }

    registerUser = async (req: Request, res: Response) => {
        const [error, registerUserDto] = RegisterUserDto.create(req.body)
        if (error) return res.status(400).json({ error })

        await this.authUseCases.registerUser
            .execute(registerUserDto!)
            .then((data) => res.json(data))
            .catch((error) => this.handleError(error, res))
    }
}
