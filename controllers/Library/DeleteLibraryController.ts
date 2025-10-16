import { StatusCodes } from '../../enums'
import { BadRequestError, NotFoundError } from '../../errors'
import Library from '../../models/Library'
import Quiz from '../../models/Quiz'
import Vocabulary from '../../models/Vocabulary'
import { Req, Res } from '../../types'
import { getUserIdByString } from '../../utils'
import { checkPersmission } from '../../utils'

export const DeleteLibraryController = async (req: Req, res: Res) => {
  const { libraryId } = req.body

  if (!libraryId) {
    throw new BadRequestError('LIBRARY_ID_IS_REQUIRED')
  }

  const findLibrary = await Library.findById(libraryId)
  
  if (!findLibrary) {
    throw new NotFoundError('LIBRARY_NOT_FOUND')
  }

  checkPersmission(req.user, getUserIdByString(findLibrary))

  // 刪除 library
  await Library.deleteOne({
    _id: libraryId,
  })

  // 刪除 library裡面的 單字
  const deleteVocabulary = await Vocabulary.deleteMany({
    libraryId: libraryId,
    userId: req.user?.userId,
  })

  // 刪除進行中的Quiz
  const deleteQuizByLibraryId = await Quiz.deleteOne({
    libraryId: libraryId,
    userId: req.user?.userId,
  })

  res.status(StatusCodes.OK).json({
    msg: 'Library deleted successfully',
    deleteVocabulary: deleteVocabulary,
    deleteQuizByLibraryId: deleteQuizByLibraryId,
  })
}