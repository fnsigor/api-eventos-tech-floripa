import { PrismaClient } from "@prisma/client"
import { Event } from "../domain/event.entity"
import { IEventRepository } from './IEventRepository'

export class EventRepository implements IEventRepository {


    private constructor(private readonly prismaClient: PrismaClient) { }


    static create(prismaClient: PrismaClient) {
        return new EventRepository(prismaClient)
    }

    async save(event: Event): Promise<void> {

        try {

            const data = {
                description: event.description,
                firstDay: event.firstDay,
                id: event.id,
                idUser: event.idUser,
                imageUrl: event.imageUrl,
                lastDay: event.lastDay,
                local: event.local,
                name: event.name,
                startTime: event.startTime
            }


            await this.prismaClient.event.create({ data })
        } catch (error) {
            console.log('EventRepository - save', error)
        }
    }

    async deleteById(id: string): Promise<void> {
        try {

            await this.prismaClient.event.delete({ where: { id } })

        } catch (error) {
            console.log('EventRepository - deleteById', error)

        }
    }
    async getAll(limit?: number, offset?: number): Promise<Event[]> {

        try {
            const queryparams: {
                take?: number,
                skip?: number,
            } = {}

            if (limit) {
                queryparams.take = limit
            }

            if (offset) {
                queryparams.skip = offset
            }

            return this.prismaClient.event.findMany({
                ...queryparams
            })
        } catch (error) {
            console.log('EventRepository - getAll', error)
            return []
        }

    }

    async getById(id: string): Promise<Event | null> {
        try {
            const event = this.prismaClient.event.findUnique({ where: { id } })
            return event
        } catch (error) {
            console.log('EventRepository - getAll', error)
            return null
        }
    }

}