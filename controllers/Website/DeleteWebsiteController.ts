import { StatusCodes } from '../../enums'
import { Req, Res } from '../../types'
import Website from '../../models/Website'
import { BadRequestError } from '../../errors'

export const DeleteWebsiteController = async (req: Req, res: Res) => {

  res.status(StatusCodes.OK).json({
    message: 'Website deleted successfully'
  })
}