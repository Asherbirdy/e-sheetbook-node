import { StatusCodes } from '../../enums'
import { BadRequestError } from '../../errors'
import Library from '../../models/Library'
import { Req, Res } from '../../types'

export const CreateLibraryController = async (req: Req, res: Res) => {
  const { title } = req.body
  const allLibrary = await Library.find({ userId: req.user?.userId })

  if (allLibrary.length >= 20) {
    throw new BadRequestError('LIBRARY_OVER_LIMIT_20')
  }

  const createLibrary = await Library.create({
    userId: req.user?.userId,
    title: title,
    averageLevel: 0,
    librarySize: 0,
    onQuiz: false,
  })

  res.status(StatusCodes.CREATED).json({ 
    msg: 'Library created successfully',
    library: createLibrary
  })
}