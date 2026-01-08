import { StatusCodes } from '../../enums'
import { Req, Res } from '../../types'
import Website from '../../models/Website'

export const GetAllWebsiteController = async (req: Req, res: Res) => {
  
  const websites = await Website.find({ 
    user: req.user?.userId 
  }).select('-html -password')
  
  res.status(StatusCodes.OK).json({
    message: 'Get all websites successfully',
    websites
  })
}