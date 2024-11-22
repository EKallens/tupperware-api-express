import { Router } from 'express'

export class AppRoutes {
    static get routes() {
        const routes = Router()

        //TODO: Add main routes here
        routes.use('/', (req, res) => {
            res.json({
                message: 'Hello World!'
            })
        })

        return routes
    }
}
