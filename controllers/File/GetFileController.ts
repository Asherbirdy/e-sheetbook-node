import { StatusCodes } from '../../enums'
import { Req, Res } from '../../types'
import File from '../../models/File'

export const GetFileController = async (req: Req, res: Res) => {
  const file = await File.find({ userId: req.user?.userId })
  res.status(StatusCodes.OK).json({
    msg: 'GetFileController_GET',
    file,
  })
}