import { TagDataSource } from '@/domain/datasources/tag/tag.datasource'
import { CreateTagDto } from '@/domain/dtos/tag/create-tag.dto'
import { UpdateTagDto } from '@/domain/dtos/tag/update-tag.dto'
import { TagEntity } from '@/domain/entities/tag.entity'
import { TagRepository } from '@/domain/repositories/tag/tag.repository'

export class TagRepositoryImpl implements TagRepository {
    constructor(private readonly tagDatasource: TagDataSource) {}

    create(createTagDto: CreateTagDto): Promise<TagEntity> {
        return this.tagDatasource.create(createTagDto)
    }

    findUserTags(userId: string): Promise<TagEntity[]> {
        return this.tagDatasource.findUserTags(userId)
    }

    findById(id: string): Promise<TagEntity> {
        return this.tagDatasource.findById(id)
    }

    update(id: string, updateTagDto: UpdateTagDto): Promise<TagEntity> {
        return this.tagDatasource.update(id, updateTagDto)
    }

    delete(id: string): Promise<void> {
        return this.tagDatasource.delete(id)
    }
}
