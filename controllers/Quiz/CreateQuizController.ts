
import { StatusCodes } from '../../enums'
import { BadRequestError, NotFoundError } from '../../errors'
import { getRandomSubarray, getUserIdByString } from '../../utils'
import Library from '../../models/Library'
import { Req, Res} from '../../types'
import { checkPersmission } from '../../utils'
import Quiz from '../../models/Quiz'
import Vocabulary from '../../models/Vocabulary'

export const CreateQuizController = async (req: Req, res: Res) => {
  const { libraryId, quizQuantity } = req.query
  if (!libraryId || !quizQuantity) {
    throw new BadRequestError('FIELD_REQUIRED')
  }

  const library = await Library.findOne({
    _id: libraryId,
  })

  checkPersmission(req.user, getUserIdByString(library))

  // 用 libraryId 找 Quiz
  const quizWithLibraryId = await Quiz.find({
    libraryId: libraryId,
    userId: req.user?.userId,
  })

  // 如果有 Quiz 就不能創建
  if (quizWithLibraryId.length > 0) {
    throw new BadRequestError('LIBRARY_ALREADY_HAVE_A_QUIZ')
  }

  // 找這lib所有單字
  const vocablaryfromLibrary = await Vocabulary.find({
    libraryId: libraryId,
  })

  // Lib 至少 20 單字 才能考試
  if (vocablaryfromLibrary.length < 20) {
    throw new BadRequestError('LIBRARY_SIZE_MUST_BE_HIGHER_THAN_20')
  }

  // 取得要考的單字 id 20 個
  const quizVocabularies = await Vocabulary.aggregate([
    { $sort: { proficiencyLevel: 1 } }, // 首先按 proficiencyLevel 升序排序
    { $limit: 20 }, // 選擇 proficiencyLevel 最低的前 20 筆
    { $project: { _id: 1 } }, // 僅包含 _id 字段
  ])

  const createQuiz = await Quiz.create({
    userId: req.user?.userId,
    libraryId: libraryId,
    
    // 20 個 id 隨機取 quizQuantity 個
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    quizVocabularyIds: getRandomSubarray(quizVocabularies, quizQuantity as any),
  })

  // 將 Library 改為 測驗狀態
  const lib = await Library.findById(libraryId)
  if (!lib) {
    throw new NotFoundError('LIBRARY_NOT_FOUND')
  }

  lib.onQuiz = true  
  await lib.save()

  res.status(StatusCodes.CREATED).json({
    msg: 'Create a quiz and Library onQuiz change to true',
    createQuiz: createQuiz,
  })
}