import { StatusCodes } from '../../enums'
import { Req, Res } from '../../types'
import { BadRequestError } from '../../errors'
import File from '../../models/File'

export const CreateFileController = async (req: Req, res: Res) => {
  const { name } = req.body

  if (!name) {
    throw new BadRequestError('REQUIRED_NAME')
  }

  const isNameExist = await File.findOne({ name, userId: req.user?.userId })

  if (isNameExist) {
    throw new BadRequestError('FILE_NAME_EXIST')
  }

  const file = await File.create({
    name,
    userId: req.user?.userId
  })

  res.status(StatusCodes.OK).json({
    msg: 'CreateFileController_POST',
    name,
    file,
  })
}