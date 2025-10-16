import { Role, StatusCodes } from '../../enums'
import { BadRequestError } from '../../errors'
import User from '../../models/User'
import { Req, Res } from '../../types'
import { attachCookieToResponse, createTokenUser } from '../../utils'

export const UserRegisterController = async (req: Req, res: Res) => {
  const { name, password } = req.body

  if(!name || !password) {
    res.status(StatusCodes.BAD_REQUEST).json({
      msg: '請提供完整資訊！ name, password'
    })
    return
  }

  const isNameExist = await User.findOne({ name })
  if (isNameExist) {
    throw new BadRequestError('NAME_ALREADY_EXISTS')
  }

  const isFirstAccount = (await User.countDocuments({})) === 0
  const role: Role = isFirstAccount ? Role.dev : Role.user

  const user = await User.create({
    name,
    password,
    role,
  })
  
  const tokenUser = createTokenUser(user)
  
  const token = attachCookieToResponse({ res, user: tokenUser })

  res.status(StatusCodes.CREATED).json({ user: tokenUser,token })
}