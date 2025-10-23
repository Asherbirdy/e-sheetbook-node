import { StatusCodes } from '../../enums'
import { Req, Res } from '../../types'
import Sheet from '../../models/Sheet'

export const GetAllSheetController = async (req: Req, res: Res) => {
  const sheets = await Sheet.find({ 
    userId: req?.user?.userId
  }).populate('fileId')
  
  res.status(StatusCodes.OK).json({
    msg: 'GetAllSheetController_GET',
    sheets
  })
}