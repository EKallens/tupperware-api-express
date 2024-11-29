import { CreateTagDto } from '@/domain/dtos/tag/create-tag.dto'
import { TagEntity } from '@/domain/entities/tag.entity'
import { TagRepository } from '@/domain/repositories/tag/tag.repository'

interface ICreateTagUseCase {
    execute(createTagDto: CreateTagDto): Promise<TagEntity>
}

export class CreateTagUseCase implements ICreateTagUseCase {
    constructor(private readonly tagRepository: TagRepository) {}

    async execute(createTagDto: CreateTagDto): Promise<TagEntity> {
        return await this.tagRepository.create(createTagDto)
    }
}
