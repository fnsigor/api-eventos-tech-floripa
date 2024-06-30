import { Event } from "../domain/event.entity";

export interface IUpdateEventRepoFunction {
    description?: string,
    firstDay?: string,
    idUser?: string,
    imageUrl?: string,
    lastDay?: string,
    local?: string,
    name?: string,
    startTime?: string
    registrationLink?: string
}

export interface IEventRepository {
    save(event: Event): Promise<void>
    getById(id: string): Promise<Event | null>
    getAllActiveEvents(limit?: number, offset?: number): Promise<Event[]>
    softDeleteById(id: string): Promise<void>
    update(id: string, updatedData: IUpdateEventRepoFunction): Promise<Event | null>
}