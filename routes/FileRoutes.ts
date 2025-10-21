import { Router } from 'express'
import { FileController } from '../controllers'

const router = Router()

router.get('/', FileController.get)

export default router
