import { StatusCodes } from '../../enums'
import { Req, Res } from '../../types'
import { BadRequestError, NotFoundError } from '../../errors'
import User from '../../models/User'

export const CreateSurveyController = async (req: Req, res: Res) => {
  res.status(StatusCodes.CREATED).json({ message: 'Create survey' })
}