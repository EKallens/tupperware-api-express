import { Router } from 'express'
import { AuthController } from './controller'

export class AuthRoutes {
    static get routes() {
        const router = Router()

        router.get('/login', AuthController.login)
        router.get('/register', AuthController.register)

        return router
    }
}
