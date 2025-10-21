import { StatusCodes } from '../../enums'
import { Req, Res } from '../../types'
import File from '../../models/File'
import { BadRequestError } from '../../errors'
import { checkPersmissionByUserId } from '../../utils'

export const EditFileController = async (req: Req, res: Res) => {
  const { fileId, name } = req.body

  if (!fileId || !name) {
    throw new BadRequestError('REQUIRED_NAME_AND_FILE_ID')
  }

  const isNameExist = await File.findById(fileId)

  if (!isNameExist) {
    throw new BadRequestError('FILE_NOT_FOUND')
  }

  if (!req.user?.userId) {
    throw new BadRequestError('USER_NOT_FOUND')
  }

  checkPersmissionByUserId(req.user.userId, isNameExist.userId)

  const file = await File.findByIdAndUpdate(
    fileId,
    { name },
    { new: true }
  )

  res.status(StatusCodes.OK).json({
    msg: 'EditFileController_PUT',
    file,
  })
}