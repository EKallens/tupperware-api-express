import { Router } from 'express'
import { HealthController } from './controller'

export class HealthRoutes {
    static get routes() {
        const router = Router()
        const controller = new HealthController()

        router.get('/', controller.ping)

        return router
    }
}
