import { StatusCodes } from '../../enums'
import User from '../../models/User'
import Register from '../../models/Register'
import { Req, Res } from '../../types'
import { generateOTP, sendOTP } from '../../utils'
import { BadRequestError } from '../../errors'

export const SendOTPController = async (req: Req, res: Res) => {
  const { email } = req.body

  if (!email) {
    throw new BadRequestError('EMAIL_REQUIRED')
  }

  // Check if email already exists in User collection
  const isEmailExistInUser = await User.findOne({ email })
  if (isEmailExistInUser) {
    throw new BadRequestError('EMAIL_ALREADY_EXISTS_IN_USER')
  }

  // Generate OTP
  const OTP = generateOTP()

  // Find or create registration record
  const registerRecord = await Register.findOne({ email })

  // If register record not found, create new registration record
  if (!registerRecord) {
    // Create new registration record
    await Register.create({ email, OTP })

    // Send OTP
    sendOTP(email, OTP)
    res.status(StatusCodes.OK).json({
      msg: 'Register record created successfully'
    })
    return
  } 

  // if register record found, check if OTP is expired

  // Check if blocked
  if (registerRecord.isBlocked) {
    const currentTime = new Date()
    if (currentTime < registerRecord.blockUntil) {
      throw new BadRequestError('TOO_MANY_OTP_REQUESTS')
    } else {
      registerRecord.isBlocked = false
      registerRecord.OTPAttempts = 0
    }
  }

  // Check for minimum 1-minute gap between OTP requests
  const lastOTPTime = registerRecord.OTPCreatedTime
  const currentTime = new Date()

  if (lastOTPTime && currentTime.getTime() - lastOTPTime.getTime() < 60000) {
    throw new BadRequestError('MINIMUM_1_MINUTE_GAP_REQUIRED')
  }

  registerRecord.OTP = OTP
  registerRecord.OTPCreatedTime = currentTime
  registerRecord.expiresAt = new Date(Date.now() + 15 * 60 * 1000) // Reset expiry to 15 minutes

  await registerRecord.save()

  sendOTP(email, OTP)

  res.status(StatusCodes.OK).json({
    msg: 'OTP sent successfully to ' + email
  })
}
