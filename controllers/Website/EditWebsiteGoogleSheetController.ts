import { BadRequestError } from '../../errors'
import { Req, Res } from '../../types'

export const EditWebsiteGoogleSheetController = async (req: Req, res: Res) => {
  const { websiteId, googleSheetName, googleSheetApiUrl, googleSheetId } = req.body

  if (!websiteId || !googleSheetName || !googleSheetApiUrl || !googleSheetId) {
    throw new BadRequestError('ALL_FIELDS_REQUIRED')
  }

  res.json({ message: 'Edit website Google sheet endpoint' })
}