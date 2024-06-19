import { Request, Response } from "express";
import { EventRepository } from "../repository/event.repository.prisma";
import { prisma } from "../../../config/prisma";
import { CreateEventInputDto, CreateEventUsecase } from "../usecases/CreateEvent.usecase";
import { UserPrismaRepository } from "../../user/repository/user.repository.prisma";
import { GetAllActiveEvents, GetAllActiveEventsInputDto } from "../usecases/GetAllActiveEvents.usecase";
import { SoftDeleteEventUsecase, SoftDeleteInputDto } from "../usecases/SoftDeleteEvent.usecase";

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


    async getAllActiveEvents(req: Request, res: Response) {

        const eventRepo = EventRepository.create(prisma)

        const usecase = GetAllActiveEvents.create(eventRepo)

        const inputDto: GetAllActiveEventsInputDto = {
            limit: req.body.limit,
            offset: req.body.offset,
        }

        const usecaseResponse = await usecase.execute(inputDto)

        res.status(usecaseResponse.status).json({ ...usecaseResponse }).send()
    }

    async softDeleteEvent(req: Request, res: Response) {

        const eventRepo = EventRepository.create(prisma)

        const usecase = SoftDeleteEventUsecase.create(eventRepo)

        const inputDto: SoftDeleteInputDto = {
            idEvent: req.body.idEvent
        }

        const usecaseResponse = await usecase.execute(inputDto)

        res.status(usecaseResponse.status).json({ ...usecaseResponse }).send()
    }
}