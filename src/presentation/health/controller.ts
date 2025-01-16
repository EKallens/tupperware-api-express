import { Request, Response } from 'express'

export class HealthController {
    constructor() {}

    ping = (req: Request, res: Response) => {
        res.status(200).json({ message: 'The API is running successfully 🚀' })
    }
}
