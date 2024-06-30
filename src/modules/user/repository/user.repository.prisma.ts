import { PrismaClient } from "@prisma/client"
import { IUserRepository } from "./IUserRepository"
import { User } from "../domain/user.entity"

export class UserPrismaRepository implements IUserRepository {


    private constructor(private readonly prismaClient: PrismaClient) { }


    static create(prismaClient: PrismaClient) {
        return new UserPrismaRepository(prismaClient)
    }

    async save(user: User): Promise<void> {

        try {
            const data = {
                id: user.id,
                email: user.email,
                password: user.password,
                username: user.username,
                idUserLevel: user.idUserLevel.valueOf()
            }


            await this.prismaClient.user.create({ data })
        } catch (error) {
            console.log('UserPrismaRepository - save', error)
        }
    }

    async getByEmail(email: string): Promise<User | null> {
        return await this.prismaClient.user.findUnique({
            where: {
                email
            }
        })
    }

    async getAll(queryParams: { take?: number, skip?: number }) {

        return await this.prismaClient.user.findMany({
            ...queryParams,
            where: {
                deletedAt: null
            }
        })
    }


    async getById(id: string): Promise<User | null> {
        return await this.prismaClient.user.findUnique({where: {id}})
    }

}