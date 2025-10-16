import { StatusCodes } from '../../enums'
import Quiz from '../../models/Quiz'
import { Req, Res } from '../../types'

export const GetCurrentQuizController = async (req: Req, res: Res) => {
  
  const getQuiz = await Quiz.find({
    userId: req.user?.userId,
  }).populate({
    path: 'libraryId',
    model: 'Library',
  })

  res.status(StatusCodes.OK).json({
    msg: 'Get Current Quiz!',
    count: getQuiz.length,
    getQuiz: getQuiz,
  })
}