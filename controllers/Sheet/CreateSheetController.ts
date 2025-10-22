import { StatusCodes } from '../../enums'
import { Req, Res } from '../../types'
import Sheet from '../../models/Sheet'
import File from '../../models/File'
import { BadRequestError } from '../../errors'

export const CreateSheetController = async (req: Req, res: Res) => {
  const { name, url, fileId } = req.body
  
  if (!name || !url || !fileId) {
    throw new BadRequestError('PLEASE_PROVIDE_ALL_FIELDS')
  }

  // Check if file exists and user is authorized
  const isFileIdValid = await File.findOne({
    _id: fileId,
    userId: req?.user?.userId 
  })
  if (!isFileIdValid) {
    throw new BadRequestError('FILE_NOT_FOUND_OR_NOT_AUTHORIZED')
  }

  // Create sheet
  const sheet = await Sheet.create({
    name,
    url,
    fileId,
    userId: req?.user?.userId
  })
  
  res.status(StatusCodes.OK).json({
    msg: 'CreateSheetController_POST',
    sheet: sheet
  })
}