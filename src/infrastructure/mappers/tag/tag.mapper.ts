import { TagEntity } from '@/domain/entities/tag.entity'
import { CustomError } from '@/domain/errors/custom.error'

export class TagMapper {
    static transformToTagEntity(object: { [key: string]: any }): TagEntity {
        const { id, _id, name } = object
        if (!id) throw CustomError.badRequest('Id is required')
        if (!name) throw CustomError.badRequest('Name is required')

        return new TagEntity(id || _id, name)
    }
}
