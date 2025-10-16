import { StatusCodes } from '../../enums'
import User from '../../models/User'
import { Req, Res } from '../../types'

export const ChangePasswordWithOTPController = async (req: Req, res: Res) => {
  const { email, OTP, newPassword } = req.body

  if (!email || !OTP || !newPassword) {
    res.status(StatusCodes.BAD_REQUEST).json({ 
      errCode: 'ALL_FIELDS_REQUIRED',
      msg: 'All fields are required'
    })
    return
  }
  
  const user = await User.findOne({ email: email })
  if (!user) {
    res.status(StatusCodes.NOT_FOUND).json({ 
      errCode: 'USER_NOT_FOUND',
      msg: 'User not found'
    })
    return
  }

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

    res.status(StatusCodes.FORBIDDEN).json({ 
      errCode: 'INVALID_OTP',
      msg: 'Invalid OTP'
    })
    return
  }

  // Check if OTP is within 5 minutes
  const OTPCreatedTime = user.OTPCreatedTime
  const currentTime = new Date()

  if (OTPCreatedTime && currentTime.getTime() - OTPCreatedTime.getTime() > 5 * 60 * 1000) {
    res.status(StatusCodes.FORBIDDEN).json({ 
      errCode: 'OTP_EXPIRED',
      msg: 'OTP expired'
    })
    return
  }
  
  // Clear OTP
  user.OTP = undefined
  user.OTPCreatedTime = undefined
  user.OTPAttempts = 0

  // Update user's password here
  user.password = newPassword
  await user.save()
  
  res.status(StatusCodes.OK).json({ 
    msg: 'Password changed successfully'
  })
}