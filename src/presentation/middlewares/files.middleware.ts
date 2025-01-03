import { NextFunction, Request, Response } from 'express'
import formidable from 'formidable'

export class FilesMiddleware {
    static generateImagePath = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const form = formidable({ multiples: false })
            form.parse(req, (err, fields, files) => {
                if (err) {
                    next(err)
                    return
                }
                req.body.files = files
                req.body.fields = fields
                next()
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Internal server error' })
        }
    }
}
