import { envs } from '@/config/envs'
import { Response } from 'express'

export const setCookie = (res: Response, token: string): void => {
    const NODE_ENV = envs.NODE_ENV
    res.cookie('token', token, {
        httpOnly: true,
        secure: NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 1000 * 60 * 60 * 2
    })
}
