import { StatusCodes } from '../../enums'
import { Req, Res } from '../../types'
import Sheet from '../../models/Sheet'

export const GetSheetFromFIleController = async (req: Req, res: Res) => {

  res.status(StatusCodes.OK).json({
    msg: 'GetAllSheetController_GET', 
  })
}