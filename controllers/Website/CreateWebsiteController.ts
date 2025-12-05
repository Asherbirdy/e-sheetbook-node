import { Role, StatusCodes } from '../../enums'
import { Req, Res } from '../../types'
import { BadRequestError, NotFoundError } from '../../errors'
import Website from '../../models/Website'

export const CreateWebsiteController = async (req: Req, res: Res) => {    
  // TODO: 实现创建网站的逻辑
  res.status(StatusCodes.OK).json({ message: 'Website created successfully' })
}