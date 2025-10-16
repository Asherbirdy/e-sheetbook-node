import { StatusCodes } from '../../enums'
import { BadRequestError, UnauthenticatedError } from '../../errors'
import Token from '../../models/Token'
import User from '../../models/User'
import { Req, Res } from '../../types'
import { attachCookieToResponse, createTokenUser } from '../../utils'
import crypto from 'crypto'

export const bindOTPEmailController = async (req: Req, res: Res) => {
  const { OTP } = req.body

  const user = await User.findById(req.user?.userId)

  if (!user) {
    throw new BadRequestError('USER_NOT_FOUND')
  }

  // Check if user account is blocked
  if (user.isBlocked) {
    const currentTime = new Date()
    if (currentTime < user.blockUntil) {
      throw new BadRequestError('ACCOUNT_BLOCKED')
    } else {
      user.isBlocked = false
      user.OTPAttempts = 0
    }
  }

  // Check OTP
  if (user.OTP !== OTP) {
    user.OTPAttempts++

    // If OTP attempts >= 5, block user for 1 hour
    if (user.OTPAttempts >= 5) {
      user.isBlocked = true
      const blockUntil = new Date()
      blockUntil.setHours(blockUntil.getHours() + 1)
      user.blockUntil = blockUntil
    }

    await user.save()

    throw new BadRequestError('INVALID_OTP')
  }

  // Check if OTP is within 5 minutes
  const OTPCreatedTime = user.OTPCreatedTime
  if (!OTPCreatedTime) {
    throw new BadRequestError('OTP_NOT_FOUND_OR_EXPIRED')
  }
  const currentTime = new Date()
  const timeDifference = currentTime.getTime() - OTPCreatedTime.getTime()

  if (timeDifference > 5 * 60 * 1000) {
    throw new BadRequestError('OTP_EXPIRED')
  }

  // Clear OTP
  user.OTP = undefined
  user.OTPCreatedTime = undefined
  user.OTPAttempts = 0
  user.emailVerified = true

  await user.save()

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
    res.status(StatusCodes.OK).json({
      msg: 'OTP binded',
      user: tokenUser,
      token
    })
    return
  }
  refreshToken = crypto.randomBytes(40).toString('hex')
  const userAgent = req.headers[ 'user-agent' ]
  const ip = req.ip
  const userToken = { refreshToken, ip, userAgent, user: user._id }

  await Token.create(userToken)
  const token = attachCookieToResponse({ res, user: tokenUser, refreshToken })

  res.status(StatusCodes.OK).json({
    msg: 'OTP binded',
    user: tokenUser,
    token
  })

}