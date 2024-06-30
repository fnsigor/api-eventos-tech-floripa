import { Event } from "../domain/event.entity";
import { EventRepository } from "../repository/event.repository.prisma";
import { IUseCase } from "./IUseCase";

export interface SoftDeleteInputDto {
    idEvent: string
}

export interface SoftDeleteOutputDto {
    status: number
    message: string
}

export class SoftDeleteEventUsecase implements IUseCase<SoftDeleteInputDto, SoftDeleteOutputDto> {

    private constructor(private readonly eventRepo: EventRepository) { }


    static create(eventRepo: EventRepository) {
        return new SoftDeleteEventUsecase(eventRepo)
    }

    async execute(input: SoftDeleteInputDto): Promise<SoftDeleteOutputDto> {

        const {event, message: invalidMessage} = await this.validateInput(input)

        if(invalidMessage){
            return {status: 400, message: invalidMessage}
        }

        await this.eventRepo.softDeleteById(event!.id)
        
        return {status: 200, message: 'Evento excluído'}
    }

    private async validateInput(input: SoftDeleteInputDto): Promise<{message?: string, event?: Event}> {

        if(!input.idEvent){
            return { message: 'Evento não informado'}
        }

        const event = await this.eventRepo.getById(input.idEvent)

        if(!event){
            return { message: 'Evento não existe'}
        }

        return {event}
    }
}