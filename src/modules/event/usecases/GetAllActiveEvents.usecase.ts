import { Event } from "../domain/event.entity";
import { EventRepository } from "../repository/event.repository.prisma";
import { IUseCase } from "./IUseCase"

export interface GetAllActiveEventsInputDto {
    limit?: number,
    offset?: number
}

interface GetAllActiveEventsOutputDto {
    status: number
    message?: string
    events?: Event[]
}

interface IFormatedEvent {
    formatedFirstDate: string;
    id: string;
    idUser: string;
    name: string;
    local: string;
    firstDay: Date;
    startTime: string;
    lastDay: Date;
    description: string;
    imageUrl: string;
    registrationLink: string;
}

export class GetAllActiveEvents implements IUseCase<GetAllActiveEventsInputDto, GetAllActiveEventsOutputDto> {
    private constructor(
        private readonly eventRepo: EventRepository,
    ) { }

    static create(eventRepo: EventRepository) {
        return new GetAllActiveEvents(eventRepo)
    }

    async execute(input: GetAllActiveEventsInputDto): Promise<GetAllActiveEventsOutputDto> {

        const { message } = this.validateInput(input)

        if (message) {
            return { status: 400, message }
        }

        const events = await this.eventRepo.getAllActiveEvents(input.limit, input.offset)

        return { status: 200, events: this.formatOutputData(events) }
    }

    private validateInput(input: GetAllActiveEventsInputDto): { message?: string } {

        if (input.limit) {
            if (isNaN(Number(input.limit))) return { message: 'parâmetro "limit" inválido' }
        }

        if (input.offset) {
            if (isNaN(Number(input.offset))) return { message: 'parâmetro "offset" inválido' }
        }

        return {}
    }

    private formatOutputData(events: Event[]): IFormatedEvent[] {
        return events.map(event => ({
            ...event,
            formatedFirstDate: event.firstDay.toISOString().split('T')[0].split('-').reverse().join('/')
        }))
    }
}