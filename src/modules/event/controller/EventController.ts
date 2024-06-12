import { Request, Response } from "express";
import { EventRepository } from "../repository/event.repository.prisma";
import { prisma } from "../../../config/prisma";
import { CreateEventInputDto, CreateEventUsecase } from "../usecases/CreateEvent.usecase";
import { UserPrismaRepository } from "../../user/repository/user.repository.prisma";

export class EventController {

    private constructor(){}

    static create(): EventController{
        return new EventController()
    }

    async createEvent(req: Request, res: Response) {

        const eventRepo = EventRepository.create(prisma)
        const userRepo = UserPrismaRepository.create(prisma)

        const usecase = CreateEventUsecase.create(eventRepo, userRepo)

        const inputDto: CreateEventInputDto = {
            description: req.body.description,
            firstDay: req.body.firstDay,
            idUser: req.body.idUser,
            imageUrl: req.body.imageUrl,
            local: req.body.local,
            name: req.body.name,
            startTime: req.body.startTime,
            lastDay:req.body.lastDay,
        }

        const usecaseResponse = await usecase.execute(inputDto)

        res.status(usecaseResponse.status).json({ ...usecaseResponse }).send()
    }
}