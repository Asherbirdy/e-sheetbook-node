import { Router } from 'express'
import { FileController } from '../controllers'

import { authenticateUser } from '../middleware'

const router = Router()

router.get('/', authenticateUser, FileController.get)
router.post('/', authenticateUser, FileController.post)
router.put('/', authenticateUser, FileController.put)
router.delete('/', authenticateUser, FileController.delete)

export default router
    