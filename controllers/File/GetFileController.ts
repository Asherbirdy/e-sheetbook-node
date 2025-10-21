import { StatusCodes } from '../../enums'
import { Req, Res } from '../../types'

export const GetFileController = async (req: Req, res: Res) => {
  res.status(StatusCodes.OK).json({
    msg: 'GetFileController_GET',
  })
}