import { 
  CreateQuizController,
  GetCurrentQuizController,
  GetLibraryQuizQuestionController,
  CloseCurrentQuizController,
  AnswerCurrentQuizController
} from './Quiz'

export const QuizController = {
  create: CreateQuizController,
  getCurrentQuiz: GetCurrentQuizController,
  getLibraryQuizQuestion: GetLibraryQuizQuestionController,
  closeCurrentQuiz: CloseCurrentQuizController,
  answerCurrentQuiz: AnswerCurrentQuizController,
}