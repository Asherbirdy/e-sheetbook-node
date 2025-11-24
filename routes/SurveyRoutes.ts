import { Router } from 'express'
import { SheetController } from '../controllers'
import { authenticateUser } from '../middleware'

const router = Router()

router.post('/create', authenticateUser, SheetController.createSheet)

export default router
