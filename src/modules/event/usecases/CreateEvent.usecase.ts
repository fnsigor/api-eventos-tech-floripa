import { UserPrismaRepository } from "../../user/repository/user.repository.prisma"
import { Event } from "../domain/event.entity"
import { EventRepository } from "../repository/event.repository.prisma"
import { IUseCase } from "./IUseCase"

export interface CreateEventInputDto {
    description: string,
    firstDay: string,
    idUser: string,
    imageUrl: string,
    lastDay?: string,
    local: string,
    name: string,
    startTime: string,
    registrationLink: string
}

export interface CreateEventOutputDto {
    event?: any
    status: number
    message: string
}

interface IUseCaseValidation {
    message?: string
}

export class CreateEventUsecase implements IUseCase<CreateEventInputDto, CreateEventOutputDto> {

    private constructor(
        private readonly eventRepo: EventRepository,
        private readonly userRepo: UserPrismaRepository
    ) { }

    static create(eventRepo: EventRepository, userRepo: UserPrismaRepository) {
        return new CreateEventUsecase(eventRepo, userRepo)
    }

    async execute(input: CreateEventInputDto): Promise<CreateEventOutputDto> {

        const { message } = await this.validate(input)

        if (message) {
            return { message, status: 400 }
        }

        let lastDay = input.firstDay

        if (input.lastDay) {
            lastDay = input.lastDay
        }

        const event = Event.create({ ...input, lastDay })

        await this.eventRepo.save(event)

        return { event, status: 200, message: 'Event criado com sucesso.' }
    }

    async validate(input: CreateEventInputDto): Promise<IUseCaseValidation> {

        if (!input.description || !input.description.trim() ) {
            return { message: 'Descrição inválida.' }
        }

        if (!input.imageUrl || !input.imageUrl.trim() || !input.imageUrl.includes('https://')) {
            return { message: 'URL da imagem inválida.' }
        }

        if (!input.registrationLink || !input.registrationLink.trim() || !input.registrationLink.includes('https://')) {
            return { message: 'Link de inscrição inválido.' }
        }

        if (!input.name || !input.name.trim()) {
            return { message: 'Nome inválido.' }
        }

        if (!input.local || !input.local.trim()) {
            return { message: 'Local inválido.' }
        }

        if (!input.idUser || !input.idUser.trim()) {
            return { message: 'Usuário não informado.' }
        }

        if (!input.firstDay || !input.firstDay.trim()) {
            return { message: 'Primeiro dia de evento não informado' }
        } else {

            const splitedDate = input.firstDay.trim().split('-')
            const year = splitedDate[0]
            const mounth = splitedDate[1]
            const day = splitedDate[2]

            if (splitedDate.length !== 3 || year.length !== 4 || mounth.length !== 2 || day.length !== 2) {
                return { message: 'Primeiro dia de evento não possui formato válido (YYYY-MM-DD)' }
            }

            if ((Number(year) < 2024 || Number(year) > 2040) || (Number(mounth) < 1 || Number(mounth) > 12) || (Number(day) < 1 && Number(day) > 31) ) {
                return { message: 'Primeiro dia de evento não possui data inválida' }
            }
        }

        if (!input.startTime || !input.startTime.trim()) {
            return { message: 'Horário de início não informado.' }
        } else {
            const splitedTime = input.startTime.trim().split(':')
            const hour = splitedTime[0]
            const minute = splitedTime[1]

            if(hour.length !== 2 || minute.length !== 2 || (Number(hour) <= 0 || Number(hour) > 24) || (Number(minute) < 0 || Number(minute) > 59)){
                return { message: 'Horário de início inválido.' }
            }
        }

        if(input.lastDay){
            const splitedDate = input.lastDay.trim().split('-')
            const year = splitedDate[0]
            const mounth = splitedDate[1]
            const day = splitedDate[2]

            if (splitedDate.length !== 3 || year.length !== 4 || mounth.length !== 2 || day.length !== 2) {
                return { message: 'Último dia de evento não possui formato válido (YYYY-MM-DD)' }
            }

            if ((Number(year) < 2024 || Number(year) > 2040) || (Number(mounth) < 1 || Number(mounth) > 12) || (Number(day) < 1 && Number(day) > 31) ) {
                return { message: 'Último dia de evento não possui data inválida' }
            }
        }

        const user = await this.userRepo.getById(input.idUser)

        if (!user) {
            return { message: 'Usuário não existe' }
        }

        return {}
    }
}


