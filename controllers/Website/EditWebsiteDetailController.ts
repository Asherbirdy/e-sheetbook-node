import { BadRequestError, NotFoundError } from '../../errors'
import { Req, Res } from '../../types'
import { StatusCodes } from '../../enums'
import Website from '../../models/Website'

export const EditWebsiteDetailController = async (req: Req, res: Res) => {
  const {
    websiteId,
    websiteTitle,
    websiteDescription,
    websiteHtml,
    websiteStatus,
    websitePassword
  } = req.body

  if (!websiteId) {
    throw new BadRequestError('WEBSITE_ID_REQUIRED')
  }

  // 查找網站並確認所有權
  const website = await Website.findOne({
    _id: websiteId,
    user: req.user?.userId
  })

  if (!website) {
    throw new NotFoundError('WEBSITE_NOT_FOUND')
  }

  // 更新網站詳細資訊 (只更新有提供的欄位)
  if (websiteTitle !== undefined) {
    website.websiteTitle = websiteTitle
  }

  if (websiteDescription !== undefined) {
    website.websiteDescription = websiteDescription
  }

  if (websiteHtml !== undefined) {
    website.websiteHtml = websiteHtml
  }

  if (websiteStatus !== undefined) {
    // 驗證 websiteStatus 值
    if (!['active', 'inactive'].includes(websiteStatus)) {
      throw new BadRequestError('INVALID_WEBSITE_STATUS')
    }
    website.websiteStatus = websiteStatus
  }

  if (websitePassword !== undefined) {
    website.websitePassword = websitePassword
  }

  await website.save()

  res.status(StatusCodes.OK).json({
    message: 'Website detail updated successfully',
    website
  })
}