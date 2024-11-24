export class UpdateTagDto {
    private constructor(public id: string, public name: string) {}

    static create(id: string, name: string): [string?, UpdateTagDto?] {
        if (!id) return ['Missing id']
        if (!name) return ['Missing name']

        return [undefined, new UpdateTagDto(id, name)]
    }
}
