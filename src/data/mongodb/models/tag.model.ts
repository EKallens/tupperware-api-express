import mongoose from 'mongoose'

const tagSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required']
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Created by is required']
        }
    },
    {
        timestamps: true
    }
)

export const TagModel = mongoose.model('Tag', tagSchema)
