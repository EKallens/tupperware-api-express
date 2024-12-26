import { TagEntity } from '@/domain/entities/tag.entity'
import { TagRepository } from '@/domain/repositories/tag/tag.repository'

interface IGetUserTagsUseCase {
    execute(userId: string): Promise<TagEntity[]>
}

export class GetUserTagsUseCase implements IGetUserTagsUseCase {
    constructor(private readonly tagRepository: TagRepository) {}

    async execute(userId: string): Promise<TagEntity[]> {
        return await this.tagRepository.findUserTags(userId)
    }
}
