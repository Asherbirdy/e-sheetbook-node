import { StatusCodes } from '../../enums'
import { BadRequestError, NotFoundError } from '../../errors'
import Quiz from '../../models/Quiz'
import Vocabulary from '../../models/Vocabulary'
import { Req, Res } from '../../types'
import { checkPersmission, getUserIdByString } from '../../utils'

export const GetLibraryQuizQuestionController = async (req: Req, res: Res) => {
  const { libraryId } = req.query

  if (!libraryId) {
    throw new BadRequestError('FIELD_REQUIRED')
  }

  const quizzes = await Quiz.find({
    libraryId: libraryId,
  })

  if (quizzes.length === 0) {
    throw new NotFoundError('QUIZ_NOT_FOUND')
  }

  checkPersmission(req.user, getUserIdByString(quizzes[ 0 ]))

  // 使用 Promise.all 來同時對每個 quiz 的 quizVocabularyIds 進行查詢
  const quizzesWithVocabularies = await Promise.all(
    quizzes.map(async (quiz) => {
      const vocabularyDetails = await Vocabulary.find({
        _id: { $in: quiz.quizVocabularyIds },
      }).select('-word')
      return {
        ... quiz.toObject(),
        vocabularyDetails,
      }
    })
  )

  // 如果只有一個 quiz，直接返回該 quiz 而非陣列
  const quizToReturn = quizzesWithVocabularies[ 0 ] // 假設只有一個 quiz 被返回

  const result = quizToReturn.vocabularyDetails.map((item) => {
    const format = item.testFormat[ 0 ]
    const middle = '_'.repeat(format.middleDash)
    return {
      index: quizToReturn.vocabularyDetails.indexOf(item) + 1,
      translation: item.translation,
      test: `${ format.firstLetter }${ middle }${ format.lastLetter }`
    }
  })

  res.status(StatusCodes.OK).json({
    msg: 'Get Current Quiz!',
    quizQuestion: result,
    quizId: quizToReturn._id,
    libraryId: libraryId,
    quiz: quizToReturn, // 直接返回 quiz 對象
  })
}