import { Request, Response } from 'express'
import { RegisterUserDto } from '@/domain/dtos/auth/register-user.dto'
import { LoginUserDto } from '@/domain/dtos/auth/login-user.dto'
import { AuthUseCases } from '@/domain/interfaces/auth.interface'
import { CustomError } from '@/domain/errors/custom.error'
import { setCookie } from '@/presentation/shared/cookies'
import { HttpStatusCode } from '@/presentation/shared/status-codes'

export class AuthController {
    constructor(private readonly authUseCases: AuthUseCases) {}

    private handleError = (error: any, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message })
        }

        return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: error ?? 'Internal server error' })
    }

    loginUser = async (req: Request, res: Response) => {
        const { email, password } = req.body
        const [error, loginUserDto] = LoginUserDto.create(email, password)
        if (error) return res.status(HttpStatusCode.BAD_REQUEST).json({ error })

        await this.authUseCases.loginUser
            .execute(loginUserDto!)
            .then((data) => {
                setCookie(res, data.token)
                res.status(HttpStatusCode.OK).json(data)
            })
            .catch((error) => this.handleError(error, res))
    }

    registerUser = async (req: Request, res: Response) => {
        const [error, registerUserDto] = RegisterUserDto.create(req.body)
        if (error) return res.status(HttpStatusCode.BAD_REQUEST).json({ error })

        await this.authUseCases.registerUser
            .execute(registerUserDto!)
            .then((data) => {
                setCookie(res, data.token)
                res.status(HttpStatusCode.CREATED).json(data)
            })
            .catch((error) => this.handleError(error, res))
    }

    verifyEmail = async (req: Request, res: Response) => {
        const { token } = req.body
        if (!token) return res.status(HttpStatusCode.BAD_REQUEST).json({ error: 'Token is required' })

        await this.authUseCases.verifyEmail
            .execute(token)
            .then(() => res.status(HttpStatusCode.OK).json({ message: 'Email verified' }))
            .catch((error) => this.handleError(error, res))
    }

    forgotPassword = async (req: Request, res: Response) => {
        const { email } = req.body
        if (!email) return res.status(HttpStatusCode.BAD_REQUEST).json({ error: 'Email is required' })

        await this.authUseCases.forgotPassword
            .execute(email)
            .then((data) => res.status(HttpStatusCode.OK).json({ message: 'Reset password email sent' }))
            .catch((error) => this.handleError(error, res))
    }

    resetPassword = async (req: Request, res: Response) => {
        const { password } = req.body
        const { token } = req.params
        if (!password || !token)
            return res.status(HttpStatusCode.BAD_REQUEST).json({ error: 'Password and token are required' })

        await this.authUseCases.resetPassword
            .execute(password, token)
            .then(() => res.status(HttpStatusCode.OK).json({ message: 'Password reset successfully' }))
            .catch((error) => this.handleError(error, res))
    }

    checkAuth = async (req: Request, res: Response) => {
        const userId = req.body.user.id
        await this.authUseCases.checkAuth
            .execute(userId)
            .then((data) => res.status(HttpStatusCode.OK).json(data))
            .catch((error) => this.handleError(error, res))
    }

    logout = async (req: Request, res: Response) => {
        res.clearCookie('token')
        res.status(HttpStatusCode.OK).json({ message: 'Logged out' })
    }
}
