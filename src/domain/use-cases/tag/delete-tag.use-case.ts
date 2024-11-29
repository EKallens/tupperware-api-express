import { TagRepository } from '@/domain/repositories/tag/tag.repository'

interface IDeleteTagUseCase {
    execute(id: string): Promise<void>
}

export class DeleteTagUseCase implements IDeleteTagUseCase {
    constructor(private readonly tagRepository: TagRepository) {}

    async execute(id: string): Promise<void> {
        await this.tagRepository.delete(id)
    }
}
