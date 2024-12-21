import { TagModel } from '@/data/mongodb/models/tag.model'
import { TagDataSource } from '@/domain/datasources/tag/tag.datasource'
import { CreateTagDto } from '@/domain/dtos/tag/create-tag.dto'
import { UpdateTagDto } from '@/domain/dtos/tag/update-tag.dto'
import { TagEntity } from '@/domain/entities/tag.entity'
import { CustomError } from '@/domain/errors/custom.error'
import { TagMapper } from '@/infrastructure/mappers/tag/tag.mapper'

export class TagDatasourceImpl implements TagDataSource {
    async create(createTagDto: CreateTagDto): Promise<TagEntity> {
        const { name } = createTagDto
        const tag = await TagModel.create({ name })

        return TagMapper.transformToTagEntity(tag)
    }

    async findAll(): Promise<TagEntity[]> {
        const tags = await TagModel.find()
        return tags.map(TagMapper.transformToTagEntity)
    }

    async findById(id: string): Promise<TagEntity> {
        const tag = await TagModel.findById(id)
        if (!tag) throw CustomError.notFound('La etiqueta no existe')

        return TagMapper.transformToTagEntity(tag)
    }

    async update(id: string, updateTagDto: UpdateTagDto): Promise<TagEntity> {
        const { name } = updateTagDto
        const tag = await TagModel.findOneAndUpdate({ _id: id }, { name }, { new: true })
        return TagMapper.transformToTagEntity(tag!)
    }

    async delete(id: string): Promise<void> {
        const tag = await TagModel.findById(id)
        if (!tag) throw CustomError.notFound('La etiqueta no existe')

        await TagModel.deleteOne({ _id: id })
    }
}
