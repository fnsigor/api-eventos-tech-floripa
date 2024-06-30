import { PrismaClient } from "@prisma/client"
import { Event } from "../domain/event.entity"
import { IEventRepository, IUpdateEventRepoFunction } from './IEventRepository'

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

    async softDeleteById(id: string): Promise<void> {
        try {

            await this.prismaClient.event.update({
                where: { id },
                data: {
                    deletedAt: new Date()
                }
            })

        } catch (error) {
            console.log('EventRepository - deleteById', error)
        }
    }

    async getAllActiveEvents(limit?: number, offset?: number): Promise<Event[]> {

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

            return await this.prismaClient.event.findMany({
                ...queryparams,
                where: {
                    deletedAt: null
                },
            })
        } catch (error) {
            console.log('EventRepository - getAllActiveEvents', error)
            return []
        }

    }

    async getById(id: string): Promise<Event | null> {
        try {
            const event = await this.prismaClient.event.findUnique({ where: { id } })
            return event
        } catch (error) {
            console.log('EventRepository - getById', error)
            return null
        }
    }

    async update(id: string, updatedData: IUpdateEventRepoFunction): Promise<Event | null> {
        try {

            const dbResponse = await this.prismaClient.event.update({
                data: {
                    ...updatedData
                },
                where: {
                    id
                }
            })

            return dbResponse

        } catch (error) {
            console.log('EventRepository - update', error)
            return null
        }
    }

}