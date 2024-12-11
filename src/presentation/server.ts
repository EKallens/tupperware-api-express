import express, { Router } from 'express'
import { logger } from '@/config/logger'
import helmet from 'helmet'
import cors from 'cors'
import { corsOptions } from '@/config/cors'

type Options = {
    port?: number
    routes: Router
}

export class Server {
    public readonly app: express.Application = express()
    private readonly port: number
    private readonly routes: Router

    constructor(options: Options) {
        const { port, routes } = options
        this.port = port || 3000
        this.routes = routes
    }

    async start() {
        this.app.use((req, res, next) => {
            logger.info({ method: req.method, url: req.url, timestamp: new Date().toISOString() })
            next()
        })
        this.app.use(cors(corsOptions))
        this.app.use(helmet())
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))

        this.app.use(this.routes)

        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`)
        })
    }
}
