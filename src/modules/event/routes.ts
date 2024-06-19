import { Router } from "express";
import { EventController } from "./controller/EventController";

const controller = EventController.create()

const router = Router()

router.post('/event/create', controller.createEvent)
router.get('/event/getAllActiveEvents', controller.getAllActiveEvents)
router.delete('/event/softDelete', controller.softDeleteEvent)



export default router;