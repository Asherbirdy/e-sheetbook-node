import { StatusCodes } from '../../enums'
import { Req, Res } from '../../types'

export const GetAllSheetController = async (req: Req, res: Res) => {
  res.status(StatusCodes.OK).json({
    msg: 'GetAllSheetController_GET'
  })
}