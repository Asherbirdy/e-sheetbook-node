import { Router } from 'express'
import { QuizRecordController } from '../controllers'
import { authenticateUser } from '../middleware'

const router = Router()

router.get(
  '/',
  authenticateUser,
  QuizRecordController.getAllQuizRecored
)

export default router