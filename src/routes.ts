import { Router } from 'express'
import userRoutes from './modules/user/routes'



export function getAppRoutes(): Router[] {
    return [
        userRoutes
    ]
} 