import { CreateTagDto } from '@/domain/dtos/tag/create-tag.dto'
import { UpdateTagDto } from '@/domain/dtos/tag/update-tag.dto'
import { TagEntity } from '@/domain/entities/tag.entity'

export interface TagDataSource {
    create(createTagDto: CreateTagDto): Promise<TagEntity>
    findAll(): Promise<TagEntity[]>
    findById(id: string): Promise<TagEntity>
    update(id: string, updateTagDto: UpdateTagDto): Promise<TagEntity>
    delete(id: string): Promise<void>
}
