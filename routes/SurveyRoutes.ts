import { Router } from 'express'
import { SurveyController } from '../controllers'
import { authenticateUser } from '../middleware'

const router = Router()

router.post('/create', authenticateUser, SurveyController.createSurvey)

export default router
