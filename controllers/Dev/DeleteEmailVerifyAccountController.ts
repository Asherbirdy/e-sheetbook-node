import { StatusCodes } from '../../enums'
import User from '../../models/User'
import { Req, Res } from '../../types'

export const DeleteNonVerifiedEmailAccountController = async ( req: Req, res: Res ) => {
  const { userId } = req.body

  if(!userId) {
    res.status(StatusCodes.BAD_REQUEST).json(({
      msg: 'User id is required'
    }))
    return
  }

  const notVerifiedUser = await User.findOne({
    _id: userId,
    emailVerified: false 
  })

  if(!notVerifiedUser) {
    res.status(StatusCodes.BAD_REQUEST).json(({
      msg: 'User not found or already verified'
    }))
    return
  }

  await notVerifiedUser.deleteOne()
  res.status( StatusCodes.OK ).json( {
    message: 'Email verify account deleted successfully'
  } )
}

