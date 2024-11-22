import express, { Router } from 'express'

type Options = {
    port?: number
    routes: Router
}

export class Server {
    public readonly app: express.Application = express()
    public readonly port: number
    public readonly routes: Router

    constructor(options: Options) {
        const { port, routes } = options
        this.port = port || 3000
        this.routes = routes
    }

    async start() {
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))

        this.app.use(this.routes)

        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`)
        })
    }
}
