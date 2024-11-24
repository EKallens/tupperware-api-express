export class CreateTagDto {
    private constructor(public name: string) {}

    static create(name: string): [string?, CreateTagDto?] {
        if (!name) return ['Missing name']

        return [undefined, new CreateTagDto(name)]
    }
}
