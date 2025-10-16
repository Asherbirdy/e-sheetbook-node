import { StatusCodes } from '../../enums'
import User from '../../models/User'
import { Req, Res } from '../../types'

export const SetDevDistrictController = async (req: Req, res: Res) => {
  const { districtId } = req.body
  if ( !districtId ) {
    res.status(StatusCodes.BAD_REQUEST).json({
      msg: 'SetDevDistrictController_POST_ERROR',
      error: 'Missing required fields'
    })
  }

  await User.findByIdAndUpdate(req.user?.userId, {
    district: districtId
  }, { new: true })

  res.status(StatusCodes.OK).json({
    msg: 'set dev district success'
  })
}
