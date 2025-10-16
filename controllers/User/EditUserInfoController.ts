import { StatusCodes } from '../../enums'
import { Req, Res } from '../../types'
import User from '../../models/User'
export const EditUserInfoController = async (req: Req, res: Res) => {
  const { name } = req.body

  if(!name) {
    res.status(StatusCodes.BAD_REQUEST).json({
      msg: '必須填寫姓名',
      errCode: 'MISSING_REQUIRED_FIELDS'
    })
    return
  }

  await User.findByIdAndUpdate(req.user?.userId, { name }, { new: true })

  res.status(StatusCodes.OK).json({
    msg: 'EditUserInfoController_PUT_SUCCESS',
  }) 
}
