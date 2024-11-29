import { TagEntity } from '@/domain/entities/tag.entity'
import { TagRepository } from '@/domain/repositories/tag/tag.repository'

interface IGetAllTagsUseCase {
    execute(): Promise<TagEntity[]>
}

export class GetAllTagsUseCase implements IGetAllTagsUseCase {
    constructor(private readonly tagRepository: TagRepository) {}

    async execute(): Promise<TagEntity[]> {
        return await this.tagRepository.findAll()
    }
}
