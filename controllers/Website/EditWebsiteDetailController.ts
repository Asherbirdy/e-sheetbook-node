import { Req, Res } from '../../types'
import { StatusCodes } from '../../enums'

export const EditWebsiteDetailController = async (req: Req, res: Res) => {
  res.status(StatusCodes.OK).json({ message: 'Website detail updated successfully' })
}