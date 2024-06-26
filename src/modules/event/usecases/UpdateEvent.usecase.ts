import { Event } from "../domain/event.entity"
import { EventRepository } from "../repository/event.repository.prisma"
import { IUseCase } from "./IUseCase"

export interface UpdateEventInputDto {
    id: string,
    description?: string,
    firstDay?: string,
    imageUrl?: string,
    lastDay?: string,
    local?: string,
    name?: string,
    startTime?: string
    registrationLink?: string
}

export interface UpdateEventOutputDto {
    event?: any
    status: number
    message: string
}

interface IUseCaseValidation {
    message?: string
}

export class UpdateEventUsecase implements IUseCase<UpdateEventInputDto, UpdateEventOutputDto> {

    private constructor(
        private readonly eventRepo: EventRepository,
    ) { }

    static create(eventRepo: EventRepository) {
        return new UpdateEventUsecase(eventRepo)
    }

    async execute(input: UpdateEventInputDto): Promise<UpdateEventOutputDto> {

        const { message, event } = await this.validateInput(input)

        if (message) {
            return { message, status: 400 }
        }

        const updatedEvent = await this.eventRepo.update(event!.id, input)

        if(!updatedEvent){
            return { message: 'Não foi possível atualizar o evento. Tente novamente', status: 500 }
        }

        return { event:updatedEvent, status: 200, message: 'Evento atualizado com sucesso.' }
    }

    async validateInput(input: UpdateEventInputDto): Promise<{message?: string, event?: Event}> {


        console.log('link: ',input.registrationLink)

        if (input.description) {
            if (!input.description.trim()) {
                return { message: 'Descrição inválida.' }
            }
        }

        if (input.imageUrl) {
            if (!input.imageUrl.trim() || !input.imageUrl.includes('https://')) {
                return { message: 'URL da imagem inválida.' }
            }
        }

        if (input.registrationLink) {
            if (!input.registrationLink.trim() || !input.registrationLink.includes('https://')) {
                return { message: 'Link de inscrição inválido.' }
            }
        }

        if (input.name) {
            if (!input.name.trim()) {
                return { message: 'Nome inválido.' }
            }
        }

        if (input.local) {
            if (!input.local.trim()) {
                return { message: 'Local inválido.' }
            }
        }

        if (input.firstDay) {

            if (!input.firstDay.trim()) {
                return { message: 'Primeiro dia de evento não possui formato válido (YYYY-MM-DD)' }
            }

            const splitedDate = input.firstDay.trim().split('-')
            const year = splitedDate[0]
            const mounth = splitedDate[1]
            const day = splitedDate[2]

            if (splitedDate.length !== 3 || year.length !== 4 || mounth.length !== 2 || day.length !== 2) {
                return { message: 'Primeiro dia de evento não possui formato válido (YYYY-MM-DD)' }
            }

            if ((Number(year) < 2024 || Number(year) > 2040) || (Number(mounth) < 1 || Number(mounth) > 12) || (Number(day) < 1 && Number(day) > 31)) {
                return { message: 'Primeiro dia de evento não possui data inválida' }
            }
        }

        if (input.startTime) {

            if (!input.startTime.trim()) {
                return { message: 'Horário de início inválido.' }
            }

            const splitedTime = input.startTime.trim().split(':')
            const hour = splitedTime[0]
            const minute = splitedTime[1]

            if (hour.length !== 2 || minute.length !== 2 || (Number(hour) <= 0 || Number(hour) > 24) || (Number(minute) < 0 || Number(minute) > 59)) {
                return { message: 'Horário de início inválido.' }
            }
        }

        if (input.lastDay) {
            const splitedDate = input.lastDay.trim().split('-')
            const year = splitedDate[0]
            const mounth = splitedDate[1]
            const day = splitedDate[2]

            if (splitedDate.length !== 3 || year.length !== 4 || mounth.length !== 2 || day.length !== 2) {
                return { message: 'Último dia de evento não possui formato válido (YYYY-MM-DD)' }
            }

            if ((Number(year) < 2024 || Number(year) > 2040) || (Number(mounth) < 1 || Number(mounth) > 12) || (Number(day) < 1 && Number(day) > 31)) {
                return { message: 'Último dia de evento não possui data inválida' }
            }
        }

        const event = await this.eventRepo.getById(input.id)

        if (!event) {
            return { message: 'Evento não existe' }
        }

        return {event}
    }
}


