import jwt from 'jsonwebtoken'
import { envs } from './envs'
import type {StringValue} from "ms";

const JWT_SEED = envs.JWT_SEED

export class JwtAdapter {
    static async generateToken(payload: Object, duration: StringValue | number = '2Hr'): Promise<string | null > {
        return new Promise((resolve) => {
            jwt.sign(payload, JWT_SEED, { expiresIn: duration }, (error, token) => {
                if (error) {
                    resolve(null)
                }
                resolve(token!)
            })
        })
    }

    static async validateToken<T>(token: string): Promise<T | null> {
        return new Promise((resolve) => {
            jwt.verify(token, JWT_SEED, (error, token) => {
                if (error) {
                    resolve(null)
                }
                resolve(token as T)
            })
        })
    }
}
