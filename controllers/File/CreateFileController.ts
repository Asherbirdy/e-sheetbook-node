import { StatusCodes } from '../../enums'
import { Req, Res } from '../../types'

export const CreateFileController = async (req: Req, res: Res) => {
  res.status(StatusCodes.OK).json({
    msg: 'CreateFileController_POST',
  })
}