import { TagEntity } from '@/domain/entities/tag.entity'
import { CreateTagDto } from '@/domain/dtos/tag/create-tag.dto'
import { UpdateTagDto } from '@/domain/dtos/tag/update-tag.dto'

export interface TagRepository {
    create(createTagDto: CreateTagDto): Promise<TagEntity>
    findUserTags(userId: string): Promise<TagEntity[]>
    findById(id: string): Promise<TagEntity>
    update(id: string, updateTagDto: UpdateTagDto): Promise<TagEntity>
    delete(id: string): Promise<void>
}
