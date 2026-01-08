import { StatusCodes } from '../../enums'
import { Req, Res } from '../../types'
import Website from '../../models/Website'
import { BadRequestError } from '../../errors'

export const CreateWebsiteController = async (req: Req, res: Res) => {
  const { googleSheetName, googleSheetApiUrl, googleSheetId } = req.body

  if (!googleSheetApiUrl || !googleSheetId) {
    throw new BadRequestError('ALL_FIELDS_REQUIRED')
  }

  // 創建新的網站記錄
  const newWebsite = new Website({
    googleSheetName: googleSheetName || 'New Sheet!',
    googleSheetApiUrl,
    googleSheetId,
    user: req.user?.userId,
  })

  await newWebsite.save()

  res.status(StatusCodes.CREATED).json({
    message: 'Website created successfully',
    website: newWebsite
  })
}