import { Router } from 'express'
import { DailyPostGroupController } from '../controllers'
import { authenticateUser } from '../middleware'
const router = Router()

router.get('/', authenticateUser, DailyPostGroupController.getAll)
export default router