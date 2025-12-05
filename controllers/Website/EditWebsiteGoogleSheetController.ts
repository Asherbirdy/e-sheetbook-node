import { BadRequestError, NotFoundError } from '../../errors'
import { Req, Res } from '../../types'
import { StatusCodes } from '../../enums'
import Website from '../../models/Website'

export const EditWebsiteGoogleSheetController = async (req: Req, res: Res) => {
  const { websiteId, googleSheetName, googleSheetApiUrl, googleSheetId, googleSheetStartRow, googleSheetFields } = req.body

  if (
    !websiteId ||
    !googleSheetApiUrl ||
    !googleSheetId ||
    !googleSheetStartRow ||
    !googleSheetFields ||
    !googleSheetName
  ) {
    throw new BadRequestError('ALL_FIELDS_REQUIRED')
  }

  // 查找網站並確認所有權
  const website = await Website.findOne({
    _id: websiteId,
    user: req.user?.userId
  })

  if (!website) {
    throw new NotFoundError('WEBSITE_NOT_FOUND')
  }

  // 更新 Google Sheet 配置
  website.googleSheetName = googleSheetName
  website.googleSheetApiUrl = googleSheetApiUrl
  website.googleSheetId = googleSheetId
  website.googleSheetStartRow = googleSheetStartRow
  website.googleSheetFields = googleSheetFields
  await website.save()

  res.status(StatusCodes.OK).json({
    message: 'Website Google Sheet updated successfully',
    website
  })
}