import express, { Request, Response } from 'express'

const app = express()
const port = 5000

app.get('/', (req: Request, res: Response) => {
    res.json({
        message: 'Hello world from express'
    })
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
