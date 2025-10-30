import { StatusCodes } from '../../enums'
import { Req, Res } from '../../types'
import Sheet from '../../models/Sheet'
import File from '../../models/File'
import { BadRequestError } from '../../errors'

export const EditSheetController = async (req: Req, res: Res) => {
  const { sheetId, fileId, name, url, api } = req.body

  if (!sheetId || !fileId || !name || !url) {
    throw new BadRequestError('PLEASE_PROVIDE_ALL_FIELDS')
  }

  const sheetValid = await Sheet.findOne({
    _id: sheetId,
    userId: req?.user?.userId
  })

  if (!sheetValid) {
    throw new BadRequestError('SHEET_NOT_FOUND_OR_NOT_AUTHORIZED')
  }

  const fileValid = await File.findOne({
    _id: fileId,
    userId: req?.user?.userId
  })

  if (!fileValid) {
    throw new BadRequestError('FILE_NOT_FOUND_OR_NOT_AUTHORIZED')
  }

  const sheetUpdated = await Sheet.findOneAndUpdate(
    { _id: sheetId },
    { name, url, api },
    { new: true }
  )

  res.status(StatusCodes.OK).json({
    msg: 'EditSheetController_PUT',
    sheetUpdated
  })
}