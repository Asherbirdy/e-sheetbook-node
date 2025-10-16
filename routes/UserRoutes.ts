import { Router } from 'express'
import { UserController } from '../controllers'
import { authenticateUser, checkVerifiedEmail } from '../middleware'
const router = Router()

router.get(
  '/showMe',
  authenticateUser,
  UserController.showCurrentUser
)

router.patch(
  '/updateUserPassword',
  authenticateUser,
  checkVerifiedEmail,
  UserController.updatePassword
)

router.get(
  '/getAllUsers',
  authenticateUser,
  checkVerifiedEmail,
  UserController.getAllUsers
)

router.put(
  '/editUserInfo',
  authenticateUser,
  checkVerifiedEmail,
  UserController.editUserInfo
)

router.patch(
  '/changeUserAccess',
  authenticateUser,
  checkVerifiedEmail,
  UserController.changeUserAccess
)

export default router
