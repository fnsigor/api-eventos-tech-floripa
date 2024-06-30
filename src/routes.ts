import { Router } from 'express'
import userRoutes from './modules/user/routes'
import eventRoutes from './modules/event/routes'



export function getAppRoutes(): Router[] {
    return [
        userRoutes,
        eventRoutes
    ]
} 