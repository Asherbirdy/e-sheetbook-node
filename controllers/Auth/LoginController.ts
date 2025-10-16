import { StatusCodes } from '../../enums'
import Token from '../../models/Token'
import crypto from 'crypto'
import User from '../../models/User'
import { Req, Res } from '../../types'
import { attachCookieToResponse, createTokenUser } from '../../utils'
import { UnauthenticatedError } from '../../errors/unauthenticated'

export const LoginController = async (req: Req, res: Res) => {
  const { name, password } = req.body
  if (!name || !password) {
    res.status(StatusCodes.BAD_REQUEST).json({ msg: '請提供帳號和密碼！' })
    return
  }
  const user = await User.findOne({ name })

  if (!user) {
    throw new UnauthenticatedError('WRONG_NAME_OR_PASSWORD_USER')
  }

  const isPasswordCorrect = await user.comparePassword(password)

  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('WRONG_NAME_OR_PASSWORD')
  }

  const tokenUser = createTokenUser(user)
  let refreshToken = ''
  const existingToken = await Token.findOne({ user: user._id })
  if (existingToken) {
    const { isValid } = existingToken
    if (!isValid) {
      throw new UnauthenticatedError('INVALID_CREDENTIALS')
    }

    refreshToken = existingToken.refreshToken
    const token = attachCookieToResponse({ res, user: tokenUser, refreshToken })
    res.status(StatusCodes.OK).json({ user: tokenUser, token })
    return
  }
  refreshToken = crypto.randomBytes(40).toString('hex')
  const userAgent = req.headers[ 'user-agent' ]
  const ip = req.ip
  const userToken = { refreshToken, ip, userAgent, user: user._id }

  await Token.create(userToken)
  const token = attachCookieToResponse({ res, user: tokenUser, refreshToken })

  res.status(StatusCodes.OK).json({ user: tokenUser, token })
}