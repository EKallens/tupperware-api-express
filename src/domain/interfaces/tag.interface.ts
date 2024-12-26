import { CreateTagUseCase } from '@/domain/use-cases/tag/create-tag.use-case'
import { GetTagUseCase } from '@/domain/use-cases/tag/get-tag.use-case'
import { GetUserTagsUseCase } from '@/domain/use-cases/tag/get-user-tags.use-case'
import { UpdateTagUseCase } from '@/domain/use-cases/tag/update-tag.use-case'
import { DeleteTagUseCase } from '@/domain/use-cases/tag/delete-tag.use-case'

export interface TagUseCases {
    createTag: CreateTagUseCase
    getTagById: GetTagUseCase
    getUserTags: GetUserTagsUseCase
    updateTag: UpdateTagUseCase
    deleteTag: DeleteTagUseCase
}
