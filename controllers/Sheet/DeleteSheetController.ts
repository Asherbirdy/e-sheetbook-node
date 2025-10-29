import { StatusCodes } from '../../enums'
import { Req, Res } from '../../types'
import Sheet from '../../models/Sheet'
import { BadRequestError } from '../../errors'

export const DeleteSheetController = async (req: Req, res: Res) => {
  const { sheetId } = req.body

  if (!sheetId) {
    throw new BadRequestError('PLEASE_PROVIDE_SHEET_ID')
  }

  const sheetValid = await Sheet.findOne({
    _id: sheetId,
    userId: req?.user?.userId
  })

  if (!sheetValid) {
    throw new BadRequestError('SHEET_NOT_FOUND_OR_NOT_AUTHORIZED')
  }

  const sheetDeleted = await Sheet.findOneAndDelete({ _id: sheetId })

  res.status(StatusCodes.OK).json({
    msg: 'DeleteSheetController_DELETE',
    sheetDeleted
  })
}