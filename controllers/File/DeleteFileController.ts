import { StatusCodes } from '../../enums'
import { Req, Res } from '../../types'

export const DeleteFileController = async (req: Req, res: Res) => {
  res.status(StatusCodes.OK).json({
    msg: 'DeleteFileController_DELETE',
  })
}