import { StatusCodes } from '../../enums'
import Token from '../../models/Token'
import { Req, Res } from '../../types'

export const LogoutController = async (req: Req, res: Res) => {
  if (!req.user) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ msg: 'User not authenticated' })
  }
  
  await Token.findOneAndDelete({ user: req.user.userId })

  res.cookie('accessToken', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now() + 1000),
  })

  res.cookie('refreshToken', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now() + 1000),
  })

  res.status(StatusCodes.OK).json({ msg: 'user logged out!' })
}