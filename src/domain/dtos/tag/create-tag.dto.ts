export class CreateTagDto {
    private constructor(public name: string) {}

    static create(object: { [key: string]: any }): [string?, CreateTagDto?] {
        const { name } = object
        if (!name) return ['Missing name']

        return [undefined, new CreateTagDto(name)]
    }
}
