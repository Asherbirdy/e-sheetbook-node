import { Router } from 'express'
import { SheetController } from '../controllers'
import { authenticateUser } from '../middleware'

const router = Router()

router.get('/', authenticateUser, SheetController.getAllSheet)
router.post('/', authenticateUser, SheetController.createSheet)

export default router
