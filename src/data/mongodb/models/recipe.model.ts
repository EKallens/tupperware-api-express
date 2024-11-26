import mongoose, { Schema } from 'mongoose'

const recipeSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Title is required']
        },
        description: {
            type: String
        },
        notes: {
            type: String,
            required: [true, 'Notes are required']
        },
        servings: {
            type: Number,
            required: [true, 'Servings are required']
        },
        tags: {
            type: Schema.Types.ObjectId,
            ref: 'Tag',
            required: [true, 'Tags are required']
        },
        ingredients: {
            type: String,
            required: [true, 'Ingredients are required']
        },
        cookTime: {
            type: Number,
            required: [true, 'Cook time is required']
        },
        preparation: {
            type: String,
            required: [true, 'Preparation is required']
        },
        difficulty: {
            type: String,
            required: [true, 'Difficulty is required']
        },
        isFavorite: {
            type: Boolean,
            default: false
        },
        img: {
            type: String
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Created by is required']
        }
    },
    {
        timestamps: true
    }
)

export const RecipeModel = mongoose.model('Recipe', recipeSchema)
