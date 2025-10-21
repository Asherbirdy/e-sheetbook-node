import { StatusCodes } from '../../enums'
import { Req, Res } from '../../types'

export const EditFileController = async (req: Req, res: Res) => {
  res.status(StatusCodes.OK).json({
    msg: 'EditFileController_PUT',
  })
}