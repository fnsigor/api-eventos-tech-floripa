import { Router } from "express";
import { UserController } from "./controller/UserController";

const controllers = new UserController()

const router = Router()

router.post('/user/create', controllers.createUser)
router.get('/user/getAll', controllers.getAllUsers)


export default router;