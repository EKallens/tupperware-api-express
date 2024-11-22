import mongoose from 'mongoose'

type Options = {
    mongoUrl: string
    mongoDbName: string
}

export class MongoDatabase {
    static async connect(options: Options) {
        try {
            const { mongoUrl, mongoDbName } = options
            await mongoose.connect(mongoUrl, {
                dbName: mongoDbName
            })
            console.log('Mongo Database connected')
        } catch (error) {
            console.log(error)
            throw error
        }
    }
}
