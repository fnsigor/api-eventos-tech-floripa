import { User } from "../domain/user.entity"
import { UserPrismaRepository } from "../repository/user.repository.prisma"
import { IUseCase } from "./IUseCase"
import JWT from 'jsonwebtoken'

export interface LoginInputDto {
    email: string,
    password: string
}


export interface LoginOutputDto {
    user?: {
        token: string
    }
    token?: string
    status: number
    message: string
}

export class LoginUseCase implements IUseCase<LoginInputDto, LoginOutputDto> {

    private constructor(private readonly repository: UserPrismaRepository) { }

    static create(repository: UserPrismaRepository) {
        return new LoginUseCase(repository)
    }

    async execute({ email, password }: LoginInputDto): Promise<LoginOutputDto> {

        const { validationErrorMessage, user } = await this.validate({ email, password })

        if (validationErrorMessage) {
            return { message: validationErrorMessage, status: 400 }
        }

        const token = JWT.sign({ id: user?.id, idUserLevel:user?.idUserLevel }, process.env.JWT_SECRET_KEY as string, { expiresIn: '4h' });

        return { user: {token, ...user}, status: 200, message: 'Login realizado com sucesso.' }
    }

    async validate({ email, password }: LoginInputDto): Promise<{ validationErrorMessage: string | null, user?: User }> {

        if (!email || !email.trim()) {
            return { validationErrorMessage: 'E-mail inválido.' }
        }

        if (!email.includes('@')) {
            return { validationErrorMessage: 'E-mail inválido.', }
        }

        if (!email.includes('.')) {
            return { validationErrorMessage: 'E-mail inválido.' }
        }

        if (!password || !password.trim()) {
            return { validationErrorMessage: 'Senha não informada.' }
        }


        const user = await this.repository.getByEmail(email.trim())

        if (!user) {
            return { validationErrorMessage: 'Usuário não encontrado. Verifique o E-mail informado.' }
        }

        if (user.password.trim() !== password.trim()) {
            return { validationErrorMessage: 'Senha incorreta.' }
        }

        return { validationErrorMessage: null, user }
    }
}


