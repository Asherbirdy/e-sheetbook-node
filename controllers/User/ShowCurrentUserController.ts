import { StatusCodes } from '../../enums'
import User from '../../models/User'
import { Req, Res } from '../../types'

export const ShowCurrentUserController = async (req: Req, res: Res) => {
  const user = await User.findById(req.user?.userId)
    .select('-password -OTPAttempts -isBlocked -__v')
  res.status(StatusCodes.OK).json({
    msg: 'User fetched successfully',
    user
  })
}