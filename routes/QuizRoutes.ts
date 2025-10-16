import { Router } from 'express'
import { QuizController } from '../controllers'
import { authenticateUser } from '../middleware'

const router = Router()

router.post(
  '/',
  authenticateUser,
  QuizController.create
)

router.get(
  '/current',
  authenticateUser,
  QuizController.getCurrentQuiz
)

router.get(
  '/libraryQuizQuestion',
  authenticateUser,
  QuizController.getLibraryQuizQuestion
)

router.post(
  '/closeCurrentQuiz',
  authenticateUser,
  QuizController.closeCurrentQuiz
)

router.post(
  '/answerCurrentQuiz',
  authenticateUser,
  QuizController.answerCurrentQuiz
)

export default router