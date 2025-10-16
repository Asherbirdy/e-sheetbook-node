import { StatusCodes } from '../../enums'
import { BadRequestError, NotFoundError } from '../../errors'
import { checkPersmission } from '../../utils'
import Quiz from '../../models/Quiz'
import { Req, Res } from '../../types'
import { getUserIdByString } from '../../utils'
import Library from '../../models/Library'

export const CloseCurrentQuizController = async (req: Req, res: Res) => {
  const { libraryId } = req.query

  if (!libraryId) {
    throw new BadRequestError('FIELD_REQUIRED')
  }

  const library = await Quiz.find({
    libraryId: libraryId,
  })

  if (library.length === 0) {
    throw new NotFoundError( 'LIBRARY_NOT_FOUND')
  }

  checkPersmission(req.user, getUserIdByString(library[ 0 ]))

  const deleteQuiz = await Quiz.deleteOne({
    libraryId: libraryId,
  })

  if (deleteQuiz.deletedCount === 0) {
    throw new NotFoundError('QUIZ_NOT_FOUND')
  }

  const lib = await Library.findById(libraryId)

  if (!lib) {
    throw new NotFoundError('LIBRARY_NOT_FOUND')
  }

  lib.onQuiz = false
  await lib.save()

  res.status(StatusCodes.OK).json({
    msg: `Library:${ libraryId } has been deleted!`,
    lib: lib,
    deleteQuiz: deleteQuiz,
  })
}