import { Event } from "../domain/event.entity";

export interface IEventRepository{
    save(event: Event): Promise<void>
    getById(id: string): Promise<Event | null>
    getAllActiveEvents(limit?: number, offset?: number): Promise<Event[]>
    softDeleteById(id: string): Promise<void>
}