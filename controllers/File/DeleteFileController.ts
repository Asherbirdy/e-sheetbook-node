import { StatusCodes } from '../../enums'
import { Req, Res } from '../../types'
import File from '../../models/File'
import { BadRequestError } from '../../errors'
import { checkPersmissionByUserId } from '../../utils'

export const DeleteFileController = async (req: Req, res: Res) => {
  const { fileId } = req.body

  if (!fileId) {
    throw new BadRequestError('REQUIRED_FILE_ID')
  }

  const isFileExist = await File.findById(fileId)

  if (!isFileExist) {
    throw new BadRequestError('FILE_NOT_FOUND')
  }

  if (!req.user?.userId) {
    throw new BadRequestError('USER_NOT_FOUND')
  }

  checkPersmissionByUserId(req.user.userId, isFileExist.userId)

  const file = await File.findByIdAndDelete(fileId)

  res.status(StatusCodes.OK).json({
    msg: 'DeleteFileController_DELETE',
    deletedFile: file,
  })
}