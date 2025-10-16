import { Req, Res } from '../../types'
import { StatusCodes } from '../../enums'

export const CheckValidTokenController = async (req: Req, res: Res) => {

  res.status(StatusCodes.OK).json({
    status: 'success',
    msg: 'Token is valid'
  })
}