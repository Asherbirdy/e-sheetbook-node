//GetWebsiteDetailByIdController.ts
import { StatusCodes } from '../../enums'
import { Req, Res } from '../../types'

export const GetWebsiteDetailByIdController = async (req: Req, res: Res) => {
  res.status(StatusCodes.OK).json({
    message: 'Get website detail successfully',
  })
}
  