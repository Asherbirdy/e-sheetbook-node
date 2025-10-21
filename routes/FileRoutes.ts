import { Router } from 'express'
import { FileController } from '../controllers'

const router = Router()

router.get('/', FileController.get)
router.post('/', FileController.post)
router.put('/', FileController.put)
router.delete('/', FileController.delete)

export default router
    