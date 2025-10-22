import { StatusCodes } from '../../enums'
import { Req, Res } from '../../types'
import Sheet from '../../models/Sheet'
import { BadRequestError } from '../../errors'

export const GetSheetFromFIleController = async (req: Req, res: Res) => {
  const { fileId } = req.query

  if (!fileId) {
    throw new BadRequestError('PLEASE_PROVIDE_FILE_ID')
  }

  const sheets = await Sheet.find({ fileId: fileId, userId: req?.user?.userId })

  if (!sheets) {
    throw new BadRequestError('SHEETS_NOT_FOUND_OR_NOT_AUTHORIZED')
  }

  res.status(StatusCodes.OK).json({
    msg: 'GetAllSheetController_GET', 
    sheets
  })
}