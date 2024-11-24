import bcrypt from 'bcrypt'

export class BcryptAdapter {
    static hash(password: string): string {
        return bcrypt.hashSync(password, 12)
    }

    static compare(password: string, hashedPassword: string): boolean {
        return bcrypt.compareSync(password, hashedPassword)
    }
}
