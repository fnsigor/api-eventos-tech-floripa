import { Event } from "../domain/event.entity";

export interface IEventRepository{
    save(event: Event): Promise<void>
    getById(id: string): Promise<Event | null>
    getAll(limit?: number, offset?: number): Promise<Event[]>
    deleteById(id: string): Promise<void>
}