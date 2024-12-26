import { Types } from 'mongoose'

export function isObjectIdValid(id: string): boolean {
    return Types.ObjectId.isValid(id) && String(new Types.ObjectId(id)) === id
}
