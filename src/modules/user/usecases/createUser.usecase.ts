import { sendEmailWthSendGrid } from "../../../utils/sendEmail"
import { User, UserLevel } from "../domain/user.entity"
import { UserPrismaRepository } from "../repository/user.repository.prisma"
import { IUseCase } from "./IUseCase"


export interface CreateUserInputDto {
    username: string
    email: string,
    password: string
}

export interface CreateUserOutputDto {
    user?: {
        id: string
        idUserLevel: UserLevel
        username: string
        email: string
        password: string
    }
    status: number
    message: string
}

interface IUseCaseValidation {
    message: string
    valid: boolean
}

export class CreateUserUsecase implements IUseCase<CreateUserInputDto, CreateUserOutputDto> {

    private constructor(private readonly repository: UserPrismaRepository) { }

    static create(repository: UserPrismaRepository) {
        return new CreateUserUsecase(repository)
    }

    async execute({ email, password, username }: CreateUserInputDto): Promise<CreateUserOutputDto> {

        const { valid, message } = await this.validate({ email, password, username })

        if (!valid) {
            return { message, status: 400 }
        }

        const user = await User.create({ email, password, username })

        await this.repository.save(user)

        await sendEmailWthSendGrid({
            html: `
            <strong>Senha de acesso à plataforma:</strong>
            <p>${password}</p>
            `,
            subject: "Bem vindo à Eventos Tech Floripa",
            text: 'This is the text content',
            to: user.email
        })

        return { user, status: 200, message: 'Usuário criado com sucesso.' }
    }

    async validate({ email, password, username }: CreateUserInputDto): Promise<IUseCaseValidation> {

        if (!email || !email.trim()) {
            return { message: 'E-mail inválido.', valid: false }
        }

        if (!email.includes('@')) {
            return { message: 'E-mail inválido.', valid: false }
        }

        if (!email.includes('.')) {
            return { message: 'E-mail inválido.', valid: false }
        }

        const userWithSameEmail = await this.repository.getByEmail(email.trim())

        if (userWithSameEmail) {
            return { message: 'E-mail já cadastrado', valid: false }
        }

        if (!password || password.trim().length < 3) {
            return { message: 'Senha deve conter no mínimo 3 caracteres.', valid: false }
        }

        if (!username || username.trim().length < 3) {
            return { message: 'Nome de usuário deve conter no mínimo 3 caracteres.', valid: false }
        }




        return { valid: true, message: 'dados válidos' }
    }
}


