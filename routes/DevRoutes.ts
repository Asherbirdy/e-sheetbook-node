import { Router } from 'express'
import { DevController } from '../controllers'
import { Role } from '../enums'
import { authenticateUser, authorizePermission } from '../middleware'

const router = Router()

router.get( '/', DevController.get )

router.get('/checkIp', DevController.checkIp)

router.post(
  '/setDevDistrict',
  authenticateUser,
  authorizePermission(Role.dev),
  DevController.setDevDistrict
)

router.delete(
  '/deleteNonVerifiedEmailAccount',
  authenticateUser,
  authorizePermission(Role.dev),
  DevController.deleteNonVerifiedEmailAccount
)

export default router