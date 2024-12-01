export class RecipeEntity {
    constructor(
        public readonly id: string,
        public readonly title: string,
        public readonly notes: string,
        public readonly servings: number,
        public readonly tags: string[],
        public readonly ingredients: string,
        public readonly cookTime: number,
        public readonly preparation: string,
        public readonly difficulty: string,
        public readonly createdBy: string,
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
        public readonly isFavorite?: boolean,
        public readonly img?: string,
        public readonly description?: string
    ) {}
}
