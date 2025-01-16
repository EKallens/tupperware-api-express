import axios from 'axios'

export interface IKeepAliveService {
    sendPing(): Promise<void>
}

export class KeepAliveService implements IKeepAliveService {
    constructor(private readonly logger: any, private readonly url: string) {}

    async sendPing(): Promise<void> {
        try {
            const response = await axios.get(`${this.url}/api/health`)
            this.logger.info(`[KeepAliveService] Ping exitoso: ${response.status}`)
            console.log(`[KeepAliveService] Ping exitoso: ${response.status}`)
        } catch (error) {
            this.logger.error(`[KeepAliveService] Error al hacer ping: ${(error as Error).message}`)
            console.error(`[KeepAliveService] Error al hacer ping: ${(error as Error).message}`)
        }
    }
}
