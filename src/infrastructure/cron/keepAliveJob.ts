import cron from 'node-cron'
import { KeepAliveService } from '@/infrastructure/services/keepAlive.service'
import { KeepAliveUseCase } from '@/domain/use-cases/health/keep-alive.use-case'
import { envs } from '@/config/envs'
import { logger } from '@/config/logger'

export class KeepAliveJob {
    static start(): void {
        const keepAliveService = new KeepAliveService(logger, envs.API_URL)
        const keepAliveUseCase = new KeepAliveUseCase(keepAliveService)

        cron.schedule(`*/${envs.CRON_JOB_MINUTES} * * * *`, async () => {
            console.log('[Cron Job] Ejecutando ping...')
            await keepAliveUseCase.execute()
        })

        console.log(`[Cron Job] Programado cada ${envs.CRON_JOB_MINUTES} minutos`)
    }
}
