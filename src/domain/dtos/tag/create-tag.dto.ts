export class CreateTagDto {
    private constructor(public name: string, public createdBy: string) {}

    static create(object: { [key: string]: any }): [string?, CreateTagDto?] {
        const { name, createdBy } = object
        if (!name) return ['Missing name']
        if (!createdBy) return ['Missing createdBy']

        return [undefined, new CreateTagDto(name, createdBy)]
    }
}
