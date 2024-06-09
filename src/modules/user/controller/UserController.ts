import { Request, Response } from "express";
import { CreateUserInputDto, CreateUserUsecase } from "../usecases/createUser.usecase";
import { UserPrismaRepository } from "../repository/user.repository.prisma";
import { prisma } from "../../../config/prisma";
import { GetAllUsersInputDto, getAllUsersUsecase } from "../usecases/getAllUsers.usecase";

export class UserController {

    async createUser(req: Request, res: Response) {

        const repository = UserPrismaRepository.create(prisma)
        const usecase = CreateUserUsecase.create(repository)

        const inputDto: CreateUserInputDto = {
            email: req.body.email,
            password: req.body.password,
            username: req.body.username
        }

        const usecaseResponse = await usecase.execute(inputDto)

        res.status(usecaseResponse.status).json({ ...usecaseResponse }).send()
    }

    async getAllUsers(req: Request, res: Response) {

        const repository = UserPrismaRepository.create(prisma)
        const usecase = getAllUsersUsecase.create(repository)

        const inputDto: GetAllUsersInputDto = {
            limit: req.query.limit as number | undefined,
            offset: req.query.offset as number | undefined
        }

        const usecaseResponse = await usecase.execute(inputDto)

        res.status(usecaseResponse.status).json({ ...usecaseResponse }).send()
    }
}