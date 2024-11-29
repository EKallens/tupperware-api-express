import { UpdateTagDto } from '@/domain/dtos/tag/update-tag.dto'
import { TagEntity } from '@/domain/entities/tag.entity'
import { TagRepository } from '@/domain/repositories/tag/tag.repository'

interface IUpdateTagUseCase {
    execute(id: string, updateTagDto: UpdateTagDto): Promise<TagEntity>
}

export class UpdateTagUseCase implements IUpdateTagUseCase {
    constructor(private readonly tagRepository: TagRepository) {}

    async execute(id: string, updateTagDto: UpdateTagDto): Promise<TagEntity> {
        return await this.tagRepository.update(id, updateTagDto)
    }
}
