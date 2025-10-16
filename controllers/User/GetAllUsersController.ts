import { StatusCodes } from '../../enums'
import { Req, Res } from '../../types'
import User from '../../models/User'

export const GetAllUsersController = async (req: Req, res: Res) => {
  const users = await User.find({}).select('-password')
  res.status(StatusCodes.OK).json({ users })
}