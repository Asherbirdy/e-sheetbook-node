import { StatusCodes } from '../../enums'
import { BadRequestError, NotFoundError } from '../../errors'
import Library from '../../models/Library'
import { Req, Res } from '../../types'
import { getUserIdByString } from '../../utils'
import { checkPersmission } from '../../utils'

export const EditLibraryController = async (req: Req, res: Res) => {
  const { libraryId, title } = req.body

  if (!libraryId || !title) {
    throw new BadRequestError('LIBRARY_FIELDS_ARE_REQUIRED')
  }

  const library = await Library.find({
    _id: libraryId,
    userId: req.user?.userId,
  })

  if (library.length === 0) {
    throw new NotFoundError('LIBRARY_NOT_FOUND')
  }

  checkPersmission(req.user, getUserIdByString(library[ 0 ]))

  const updatedLibrary = await Library.findByIdAndUpdate(
    libraryId,
    { title },
    { new: true }
  )

  res.status(StatusCodes.OK).json({
    msg: 'Library edited successfully',
    library: updatedLibrary
  })
}