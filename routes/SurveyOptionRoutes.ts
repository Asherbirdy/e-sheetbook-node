import { Router } from 'express'
import { SurveyOptionController } from '../controllers'
import { authenticateUser } from '../middleware'

const router = Router()

router.get('/:surveyId', authenticateUser, SurveyOptionController.getSurveyOptions)

export default router
