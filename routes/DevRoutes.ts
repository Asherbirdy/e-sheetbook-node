import { Router } from 'express'
import { DevController } from '../controllers'

const router = Router()
router.get( '/', DevController.get )
router.get('/checkIp', DevController.checkIp)

export default router