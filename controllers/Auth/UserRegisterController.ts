import { Role, StatusCodes } from '../../enums'
import { BadRequestError } from '../../errors'
import User from '../../models/User'
import Register from '../../models/Register'
import { Req, Res } from '../../types'
import { attachCookieToResponse, createTokenUser } from '../../utils'

export const UserRegisterController = async (req: Req, res: Res) => {
  const { name, password, email, OTP } = req.body
  
  if (!name || !password || !email || !OTP) {
    throw new BadRequestError('ALL_INFORMATION_REQUIRED')
  }

  const isEmailExist = await User.findOne({ email })
  if (isEmailExist) {
    throw new BadRequestError('EMAIL_ALREADY_EXISTS')
  }

  const isOTPValid = await Register.findOne({ email })
  if (!isOTPValid) {
    throw new BadRequestError('OTP_NOT_VALID')
  }

  if(isOTPValid.isBlocked) {
    const currentTime = new Date()
    if(currentTime < isOTPValid.blockUntil) {
      throw new BadRequestError('ACCOUNT_BLOCKED')
    } else {
      isOTPValid.isBlocked = false
      isOTPValid.OTPAttempts = 0
    }
  }

  if (isOTPValid.OTP !== OTP) {
    isOTPValid.OTPAttempts++
    if(isOTPValid.OTPAttempts >= 3) {
      isOTPValid.isBlocked = true
      const blockUntil = new Date()
      blockUntil.setHours(blockUntil.getHours() + 1)
      isOTPValid.blockUntil = blockUntil
    }
    await isOTPValid.save()
    throw new BadRequestError('OTP_NOT_MATCH')
  }

  const OTPCreatedTime = isOTPValid.OTPCreatedTime
  if (!OTPCreatedTime) {
    throw new BadRequestError('OTP_NOT_FOUND_OR_EXPIRED')
  }

  const currentTime = new Date()
  const timeDifference = currentTime.getTime() - OTPCreatedTime.getTime()

  if (timeDifference > 5 * 60 * 1000) {
    throw new BadRequestError('OTP_EXPIRED')
  }

  isOTPValid.OTP = undefined
  isOTPValid.OTPCreatedTime = undefined
  isOTPValid.OTPAttempts = 0
  await isOTPValid.save()

  const isFirstAccount = (await User.countDocuments({})) === 0
  const role: Role = isFirstAccount ? Role.dev : Role.user

  const user = await User.create({
    name,
    password,
    role,
    email,
    emailVerified: true,
  })

  const tokenUser = createTokenUser(user)

  const token = attachCookieToResponse({ res, user: tokenUser })

  res.status(StatusCodes.CREATED).json({ user: tokenUser, token })
}