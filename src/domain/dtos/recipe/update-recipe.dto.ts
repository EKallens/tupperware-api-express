export class UpdateRecipeDto {
    private constructor(
        public readonly title: string,
        public readonly notes: string,
        public readonly servings: number,
        public readonly tags: string[],
        public readonly ingredients: string,
        public readonly cookTime: number,
        public readonly preparation: string,
        public readonly difficulty: string,
        public readonly img?: string,
        public readonly description?: string
    ) {}

    static create(object: { [key: string]: any }): [string?, UpdateRecipeDto?] {
        const { title, notes, servings, tags, ingredients, cookTime, preparation, difficulty, img, description } =
            object
        if (!title) return ['Missing title']
        if (!notes) return ['Missing notes']
        if (!servings) return ['Missing servings']
        if (!tags) return ['Missing tags']
        if (!ingredients) return ['Missing ingredients']
        if (!cookTime) return ['Missing cook time']
        if (!preparation) return ['Missing preparation']
        if (!difficulty) return ['Missing difficulty']

        return [
            undefined,
            new UpdateRecipeDto(
                title,
                notes,
                servings,
                tags,
                ingredients,
                cookTime,
                preparation,
                difficulty,
                img,
                description
            )
        ]
    }
}
