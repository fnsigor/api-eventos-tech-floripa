import { User } from "../domain/user.entity"
import { UserPrismaRepository } from "../repository/user.repository.prisma"
import { IUseCase } from "./IUseCase"


export interface GetAllUsersInputDto {
    limit?: number,
    offset?: number
}
export interface GetAllUsersOutputDto {
    users?: User[]
    status: number
    message: string
}

interface IUseCaseValidation {
    message: string
    valid: boolean
}

export class getAllUsersUsecase implements IUseCase<GetAllUsersInputDto, GetAllUsersOutputDto> {

    private constructor(private readonly repository: UserPrismaRepository) { }

    static create(repository: UserPrismaRepository) {
        return new getAllUsersUsecase(repository)
    }

    async execute({ limit, offset }: GetAllUsersInputDto): Promise<GetAllUsersOutputDto> {

        const { valid, message } = this.validate({ limit, offset })

        if (!valid) {
            return { message, status: 400 }
        }

        const queryParams: { take?: number, skip?: number } = {}

        if (limit) {
            queryParams.take = limit
        }

        if (offset) {
            queryParams.skip = offset
        }


        const users = await this.repository.getAll(queryParams)

        return { users, status: 200, message: 'Usuário criado com sucesso.' }
    }

    validate({ limit, offset }: GetAllUsersInputDto): IUseCaseValidation {

        if (typeof limit !== "number" && typeof limit !== "undefined" ) {
            return { valid: false, message: 'verifique o parâmetro limit' }
        }

        if (typeof offset !== "number" && typeof offset !== "undefined") {
            return { valid: false, message: 'verifique o parâmetro offset' }
        }

        return { valid: true, message: 'dados válidos' }
    }
}


