import { StatusCodes } from '../../enums'
import { Req, Res } from '../../types'

export const CreateSheetController = async (req: Req, res: Res) => {
  res.status(StatusCodes.OK).json({
    msg: 'CreateSheetController_POST'
  })
}