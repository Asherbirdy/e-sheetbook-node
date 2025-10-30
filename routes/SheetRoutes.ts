import { Router } from 'express'
import { SheetController } from '../controllers'
import { authenticateUser } from '../middleware'

const router = Router()

router.get('/', authenticateUser, SheetController.getAllSheet)
router.post('/', authenticateUser, SheetController.createSheet)
router.put('/', authenticateUser, SheetController.editSheet)
router.delete('/', authenticateUser, SheetController.deleteSheet)
router.get('/file', authenticateUser, SheetController.getSheetFromFIle)

export default router
