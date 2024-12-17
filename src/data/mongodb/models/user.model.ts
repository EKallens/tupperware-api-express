import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required']
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true
        },
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        img: {
            type: String
        },
        isVerified: {
            type: Boolean,
            default: false
        },
        resetPasswordToken: {
            type: String
        },
        resetPasswordExpiresAt: {
            type: Date
        },
        verificationToken: {
            type: String
        },
        verificationTokenExpiresAt: {
            type: Date
        },
        roles: {
            type: [String],
            default: ['USER_ROLE'],
            enum: ['USER_ROLE', 'ADMIN_ROLE']
        }
    },
    {
        timestamps: true
    }
)

export const UserModel = mongoose.model('User', userSchema)
