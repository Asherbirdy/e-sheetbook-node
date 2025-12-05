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

router.put(
  '/edit-sheet',
  authenticateUser,
  checkVerifiedEmail,
  WebsiteController.editWebsiteSheet
)
  
router.put(
  '/edit-detail',
  authenticateUser,
  checkVerifiedEmail,
  WebsiteController.editWebsiteDetail
)

export default router