import 'module-alias/register'

import { envs } from './config/envs'
import { MongoDatabase } from './data/mongodb/mongo-database'
import { AppRoutes } from './presentation/routes'
import { Server } from './presentation/server'
;(() => {
    main()
})()

async function main() {
    await MongoDatabase.connect({
        mongoUrl: envs.MONGO_URL,
        mongoDbName: envs.MONGO_DB_NAME
    })

    new Server({
        port: envs.PORT,
        routes: AppRoutes.routes
    }).start()
}
