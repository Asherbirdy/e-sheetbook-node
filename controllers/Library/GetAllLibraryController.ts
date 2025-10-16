import { StatusCodes } from '../../enums'
import Library from '../../models/Library'
import { Req, Res } from '../../types'

export const GetAllLibraryController = async (req: Req, res: Res) => {
  const allLibrary = await Library.find({ userId: req.user?.userId })

  res.status(StatusCodes.OK).json({
    msg: 'All library fetched successfully',
    count: allLibrary.length,
    library: allLibrary
  })
}