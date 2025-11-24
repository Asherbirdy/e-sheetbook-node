import { StatusCodes } from '../../enums'
import { Req, Res } from '../../types'
import { BadRequestError, NotFoundError } from '../../errors'
import SurveyOption from '../../models/SurveyOption'

export const GetSurveyOptionController = async (req: Req, res: Res) => {
  const { surveyId } = req.params

  if (!surveyId) {
    throw new BadRequestError('Please provide surveyId')
  }

  const options = await SurveyOption.find({ surveyId }).sort({ createdAt: 1 })

  if (!options || options.length === 0) {
    throw new NotFoundError('No options found for this survey')
  }

  res.status(StatusCodes.OK).json({
    count: options.length,
    options,
  })
}
