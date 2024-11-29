import { TagEntity } from '@/domain/entities/tag.entity'
import { TagRepository } from '@/domain/repositories/tag/tag.repository'

interface IGetTagUseCase {
    execute(id: string): Promise<TagEntity>
}

export class GetTagUseCase implements IGetTagUseCase {
    constructor(private readonly tagRepository: TagRepository) {}

    async execute(id: string): Promise<TagEntity> {
        return await this.tagRepository.findById(id)
    }
}
