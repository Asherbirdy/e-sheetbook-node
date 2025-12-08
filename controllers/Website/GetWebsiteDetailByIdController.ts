import { StatusCodes } from '../../enums'
import { Req, Res } from '../../types'
import Website from '../../models/Website'
import { BadRequestError, NotFoundError, UnauthenticatedError } from '../../errors'

export const GetWebsiteDetailByIdController = async (req: Req, res: Res) => {
  const { websiteId, password } = req.body

  if (!websiteId) {
    throw new BadRequestError('WEBSITE_ID_REQUIRED')
  }

  // 查找網站(只排除 websitePassword,其他欄位都要返回)
  const website = await Website.findOne({
    _id: websiteId,
    websiteStatus: 'active'
  }).select('-websitePassword')

  if (!website) {
    throw new NotFoundError('WEBSITE_NOT_FOUND')
  }

  // 檢查是否需要密碼
  if (website.websiteNeedPassword) {
    const websiteWithPassword = await Website // 需要重新查詢以獲取密碼進行比對
      .findById(websiteId)
      .select('websitePassword')

    if (!password || password !== websiteWithPassword?.websitePassword) {
      throw new UnauthenticatedError('INVALID_PASSWORD')
    }
  }

  res.status(StatusCodes.OK).json({
    message: 'Get website detail successfully',
    website
  })
}