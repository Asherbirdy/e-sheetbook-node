import { Router } from 'express'
import { WebsiteController } from '../controllers'
import { authenticateUser, checkVerifiedEmail } from '../middleware'

const router = Router()

router.post(
  '/create',
  authenticateUser,
  checkVerifiedEmail,
  WebsiteController.create
)

export default router