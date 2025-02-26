export class LoginUserDto {
    private constructor(public email: string, public password: string) {}

    static create(email: string, password: string): [string?, LoginUserDto?] {
        if (!email) return ['Missing email', undefined]
        if (!password) return ['Missing password', undefined]

        return [undefined, new LoginUserDto(email, password)]
    }
}
