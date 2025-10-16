import { StatusCodes } from '../../enums'
import QuizRecord from '../../models/QuizRecord'
import { Req, Res } from '../../types'

export const GetAllQuizRecoredController = async (req: Req, res: Res) => {
  const getAllRecords = await QuizRecord.find({
    userId: req.user?.userId,
  })
  res.status(StatusCodes.OK).json({
    msg: 'Get Current Quiz!',
    getAllRecords: getAllRecords,
  })
}