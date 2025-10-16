import { StatusCodes } from '../../enums'
import User from '../../models/User'
import { Req, Res } from '../../types'
import { generateOTP, sendOTP } from '../../utils'

export const SendOTPController = async (req: Req, res: Res) => {
  const { email } = req.body

  if (!email) {
    res.status(StatusCodes.BAD_REQUEST).json({ 
      errCode: 'EMAIL_REQUIRED',
      msg: 'Email is required'
    })
    return
  }

  const isEmailExist = await User.findOne({ email })
  
  // 如果 email 已經存在，但不是同個 user，則回傳錯誤
  if (isEmailExist && String(isEmailExist?._id?.toString()) !== String(req.user?.userId)) {
    res.status(StatusCodes.BAD_REQUEST).json({ 
      errCode: 'EMAIL_ALREADY_EXISTS',
      msg: 'Email already exists'
    })
    return
  }
  const user = await User.findById(req.user?.userId)

  if (!user) {
    res.status(StatusCodes.NOT_FOUND).json({ 
      errCode: 'USER_NOT_FOUND',
      msg: 'User not found'
    })
    return
  }

  // If user is blocked, return an error
  if (user.isBlocked) {
    const currentTime = new Date()
    if (currentTime < user.blockUntil) {
      res.status(StatusCodes.FORBIDDEN).json({ 
        errCode: 'ACCOUNT_BLOCKED',
        msg: 'Account blocked. Try after some time.'
      })
      return
    } else {
      user.isBlocked = false
      user.OTPAttempts = 0
    }
  }

  // Check for minimum 1-minute gap between OTP requests
  const lastOTPTime = user.OTPCreatedTime
  const currentTime = new Date()

  if (lastOTPTime && currentTime.getTime() - lastOTPTime.getTime() < 60000) {
    res.status(StatusCodes.BAD_REQUEST).json({ 
      errCode: 'MINIMUM_1_MINUTE_GAP_REQUIRED',
      msg: 'Minimum 1-minute gap required between OTP requests'
    })
    return
  }

  const OTP = generateOTP()
  user.OTP = OTP
  user.OTPCreatedTime = currentTime
  user.email = email

  await user.save()

  sendOTP(email, OTP)

  res.status(StatusCodes.OK).json({ 
    msg: 'OTP sent successfully'
  })
}
