import { BadRequestError, NotFoundError } from '../../errors'
import { Req, Res } from '../../types'
import { StatusCodes } from '../../enums'
import Website from '../../models/Website'

export const DeleteWebsiteController = async (req: Req, res: Res) => {
  const { websiteId } = req.body

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

  // 刪除網站
  await Website.deleteOne({ _id: websiteId })

  res.status(StatusCodes.OK).json({
    message: 'Website deleted successfully',
    websiteId
  })
}