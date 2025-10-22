import { StatusCodes } from '../../enums'
import { Req, Res } from '../../types'
import Sheet from '../../models/Sheet'

export const DeleteSheetController = async (req: Req, res: Res) => {
  const sheets = await Sheet.find()
  res.status(StatusCodes.OK).json({
    msg: 'DeleteSheetController_DELETE',
    sheets
  })
}