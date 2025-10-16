import { StatusCodes } from '../../enums'
import Token from '../../models/Token'
import { Req, Res } from '../../types'
import { attachCookieToResponse, isTokenValid } from '../../utils'

export const RefreshTokenController = async (req: Req, res: Res) => {
  let jwtrefreshToken = null
  const authHeader = req.headers[ 'authorization' ]
  if (authHeader) {
    jwtrefreshToken = authHeader.split(' ')[ 1 ]
  }
  interface UserPayload {
    user: {
      name: string;
      userId: string;
      role: string;
    };
    refreshToken?: string;
  }
  const payload = isTokenValid(jwtrefreshToken) as UserPayload
  const existingToken = await Token.findOne({
    user: payload.user.userId,
    refreshToken: payload.refreshToken,
  })
  const token = attachCookieToResponse({
    res,
    user: payload.user,
    refreshToken: existingToken?.refreshToken,
  })

  res.status(StatusCodes.OK).json({
    msg: 'refreshToken',
    jwtAccessToken: token,
  })
}