import { Router } from 'express'
import { SheetController } from '../controllers'
import { authenticateUser } from '../middleware'

const router = Router()

router.get('/', authenticateUser, SheetController.getAllSheet)

export default router
