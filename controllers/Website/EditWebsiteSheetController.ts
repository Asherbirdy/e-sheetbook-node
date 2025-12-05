import { BadRequestError } from '../../errors'
import { Req, Res } from '../../types'

export const EditWebsiteSheetController = async (req: Req, res: Res) => {
  const { sheetName, sheetApiUrl, sheetId } = req.body

  if (!sheetName || !sheetApiUrl || !sheetId) {
    throw new BadRequestError('ALL_FIELDS_REQUIRED')
  }

  res.json({ message: 'Edit website sheet endpoint' })
}