import { Role, StatusCodes } from '../../enums'
import { Req, Res } from '../../types'
import { BadRequestError, NotFoundError } from '../../errors'
import User from '../../models/User'

export const ChangeUserAccessController = async (req: Req, res: Res) => {
  const { userId, landingPageAccess, role } = req.body

  if (!Array.isArray(landingPageAccess) || !role || !userId) {
    throw new BadRequestError('LANDING_PAGE_ACCESS_REQUIRED')
  }

  // 不能改成 dev
  if(role === Role.dev ) {
    throw new BadRequestError('ADMIN_CANNOT_CHANGE_ACCESS_TO_DEV_')
  }

  const user = await User.findById(userId)

  if (!user) {
    throw new NotFoundError('USER_NOT_FOUND')
  }

  user.role = role
  await user.save()

  res.status(StatusCodes.OK).json({
    msg: 'User access changed',
    user
  })

}