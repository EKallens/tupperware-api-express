import { TagModel } from '@/data/mongodb/models/tag.model'
import { UserModel } from '@/data/mongodb/models/user.model'
import { isObjectIdValid } from '@/data/mongodb/utils/objectIdValidator'
import { TagDataSource } from '@/domain/datasources/tag/tag.datasource'
import { CreateTagDto } from '@/domain/dtos/tag/create-tag.dto'
import { UpdateTagDto } from '@/domain/dtos/tag/update-tag.dto'
import { TagEntity } from '@/domain/entities/tag.entity'
import { CustomError } from '@/domain/errors/custom.error'
import { TagMapper } from '@/infrastructure/mappers/tag/tag.mapper'

export class TagDatasourceImpl implements TagDataSource {
    async create(createTagDto: CreateTagDto): Promise<TagEntity> {
        const { name, createdBy } = createTagDto
        if (!isObjectIdValid(createdBy)) throw CustomError.badRequest('El id no es válido')
        const tag = await TagModel.findOne({ name, createdBy })
        if (tag) throw CustomError.badRequest('La etiqueta ya existe')
        const newTag = await TagModel.create({ name, createdBy })

        return TagMapper.transformToTagEntity(newTag!)
    }

    async findUserTags(userId: string): Promise<TagEntity[]> {
        if (!isObjectIdValid(userId)) throw CustomError.badRequest('El id no es válido')
        const user = await UserModel.findOne({ _id: userId })
        if (!user) throw CustomError.notFound('El usuario no existe')

        const tags = await TagModel.find({ createdBy: userId })
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
