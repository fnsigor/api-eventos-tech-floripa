import { Router } from "express";
import { EventController } from "./controller/EventController";

const controller = EventController.create()

const router = Router()

router.post('/event/create', controller.createEvent)
router.get('/event/getAll', controller.getAllActiveEvents)
router.delete('/event/delete', controller.softDeleteEvent)
router.patch('/event/update', controller.updateEvent)



export default router;