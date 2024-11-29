import { CreateTagUseCase } from '@/domain/use-cases/tag/create-tag.use-case'
import { GetTagUseCase } from '@/domain/use-cases/tag/get-tag.use-case'
import { GetAllTagsUseCase } from '@/domain/use-cases/tag/get-tags.use-case'
import { UpdateTagUseCase } from '@/domain/use-cases/tag/update-tag.use-case'
import { DeleteTagUseCase } from '@/domain/use-cases/tag/delete-tag.use-case'

export interface TagUseCases {
    createTag: CreateTagUseCase
    getTagById: GetTagUseCase
    getAllTags: GetAllTagsUseCase
    updateTag: UpdateTagUseCase
    deleteTag: DeleteTagUseCase
}
