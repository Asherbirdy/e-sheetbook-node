import { StatusCodes } from '../../enums'
import { Req, Res } from '../../types'
import { BadRequestError, NotFoundError } from '../../errors'
import Library from '../../models/Library'
import Vocabulary from '../../models/Vocabulary'
import { checkPersmission, getUserIdByString, proficiencyLevelMethod } from '../../utils'
import Quiz from '../../models/Quiz'

export const DeleteVocabularyByIdController = async (req: Req, res: Res) => {
  const { vocabularyId } = req.body

  if (!vocabularyId) {
    throw new BadRequestError('ALL_FIELDS_ARE_REQUIRED')
  }

  // 用id找單字
  const vocabulary = await Vocabulary.findOne({
    _id: vocabularyId,
  })
  
  if (vocabulary === null) {
    throw new NotFoundError('VOCABULARY_NOT_FOUND')
  }

  checkPersmission(req.user, getUserIdByString(vocabulary))

  // 檢查這單字有沒有在Quiz裡面
  const quiz = await Quiz.findOne({ quizVocabularyIds: vocabularyId })
  if (quiz) {
    throw new BadRequestError('VOCABULARY_IN_QUIZ')
  }

  // 找到單字並且刪掉
  await Vocabulary.deleteOne({
    _id: vocabularyId,
    userId: req.user?.userId,
  })

  // 更新 librarySize
  const library = await Library.findOne({
    _id: vocabulary.libraryId,
  })
  
  // 找出所有
  const updateLibrary = await Vocabulary.find({
    libraryId: vocabulary.libraryId,
    userId: req.user?.userId,
  })

  if (library === null) {
    throw new NotFoundError( 'LIBRARY_NOT_FOUND')
  }
  
  const proficiencyLevel = updateLibrary.length === 0 ? 0 : proficiencyLevelMethod(updateLibrary)

  library.averageLevel = proficiencyLevel // 重新算熟悉度
  library.librarySize = library.librarySize - 1 // library大小 - 1
  await library.save()
  
  res.status(StatusCodes.OK).json({
    msg: 'Delete Sucesssfully!',
    vocabulary: vocabulary,
  })
}