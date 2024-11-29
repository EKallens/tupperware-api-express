export class UpdateTagDto {
    private constructor(public name: string) {}

    static create(updateTagDto: UpdateTagDto): [string?, UpdateTagDto?] {
        const { name } = updateTagDto
        if (!name) return ['Missing name']

        return [undefined, new UpdateTagDto(name)]
    }
}
