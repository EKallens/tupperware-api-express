import { IKeepAliveService } from '@/infrastructure/services/keepAlive.service'

export class KeepAliveUseCase {
    constructor(private keepAliveService: IKeepAliveService) {}

    async execute(): Promise<void> {
        await this.keepAliveService.sendPing()
    }
}
