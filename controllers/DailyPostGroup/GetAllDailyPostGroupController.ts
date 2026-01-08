import { Request, Response } from 'express'
import { StatusCodes } from '../../enums'

export const GetAllDailyPostGroupController = async (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({
    msg: 'Get all daily post group',
  })
}
