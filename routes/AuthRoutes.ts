import { Router } from 'express'
import { AuthController } from '../controllers'
import { authenticateUser } from '../middleware'
const router = Router()

router.post('/userRegister', AuthController.userRegister)
router.post('/login', AuthController.login)
router.delete('/logout', authenticateUser, AuthController.logout)
router.get('/refreshToken', authenticateUser, AuthController.refreshToken)
router.post('/sendOTP', authenticateUser, AuthController.sendOTP)
router.post('/bindOTPEmail', authenticateUser, AuthController.bindOTPEmail)

router.post('/forgetPasswordEmailOTP', AuthController.forgetPasswordEmailOTP)
router.post('/changePasswordWithOTP', AuthController.changePasswordWithOTP)

router.get('/checkValidToken',authenticateUser, AuthController.checkValidToken)
export default router
