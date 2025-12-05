import { StatusCodes } from '../../enums'
import { Req, Res } from '../../types'
import Website from '../../models/Website'
import { BadRequestError } from '../../errors'

export const CreateWebsiteController = async (req: Req, res: Res) => {    
  const { sheetName, sheetApiUrl, sheetId } = req.body

  if (!sheetApiUrl || !sheetId) {
    throw new BadRequestError('ALL_FIELDS_REQUIRED')
  }
  
  // 创建新的网站记录
  const newWebsite = new Website({
    sheetName: sheetName || 'New Sheet!',
    sheetApiUrl,
    sheetId,
    user: req.user?.userId,
  })
  
  await newWebsite.save()
  
  res.status(StatusCodes.CREATED).json({ 
    message: 'Website created successfully',
    website: newWebsite 
  })
}