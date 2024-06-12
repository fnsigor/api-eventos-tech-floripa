import { Router } from "express";
import { EventController } from "./controller/EventController";

const controller = EventController.create()

const router = Router()

router.post('/event/create', controller.createEvent)


export default router;