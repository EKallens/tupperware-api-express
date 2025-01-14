import { envs } from '@/config/envs'
import { Response } from 'express'

export const setCookie = (res: Response, token: string): void => {
    const NODE_ENV = envs.NODE_ENV
    console.log(`Setting cookie with SameSite: ${NODE_ENV === 'production' ? 'none' : 'lax'} !!!!`)
    res.cookie('token', token, {
        httpOnly: true,
        secure: NODE_ENV === 'production',
        sameSite: NODE_ENV === 'production' ? 'none' : 'lax',
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)
    })
}
