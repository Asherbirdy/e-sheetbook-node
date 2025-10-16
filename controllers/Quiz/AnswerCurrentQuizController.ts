import { StatusCodes } from '../../enums'
import { NotFoundError } from '../../errors'
import Library from '../../models/Library'
import Quiz from '../../models/Quiz'
import QuizRecord from '../../models/QuizRecord'
import Vocabulary from '../../models/Vocabulary'
import { Req, Res } from '../../types'
import { checkPersmission, getUserIdByString, proficiencyLevelMethod } from '../../utils'

export const AnswerCurrentQuizController = async (req: Req, res: Res) => {
  const { quizId, quizAnswer } = req.body
  if (!quizId || !quizAnswer) {
    throw new NotFoundError('Please provide quizId and quizAnswer')
  }

  // 找 Quiz 存不存在
  const quiz = await Quiz.findOne({ _id: quizId })
  if (!quiz) {
    throw new NotFoundError('QUIZ_NOT_FOUND')
  }

  checkPersmission(req.user, getUserIdByString(quiz))

  // 找單字的答案
  const vocabularyDetails = await Vocabulary.find({
    _id: { $in: quiz.quizVocabularyIds },
  })

  let correctAnswersCount = 0 // 用於計算正確答案的數量

  // 對答案
  const records = vocabularyDetails.map((vocabulary, index) => {
    const userAnswer = quizAnswer[ index ] || ''
    const isCorrected = userAnswer === vocabulary.word
    if (isCorrected) correctAnswersCount += 1 // 如果答案正確，則增加計數

    const originalProficiencyLevel = vocabulary.proficiencyLevel
    let updatedProficiencyLevel = isCorrected
      ? originalProficiencyLevel + 1
      : originalProficiencyLevel - 1
    updatedProficiencyLevel = Math.max(Math.min(updatedProficiencyLevel, 5), 0)

    return {
      vocabularyId: vocabulary._id,
      word: vocabulary.word,
      userAnswer,
      translation: vocabulary.translation,
      corrected: isCorrected,
      originalProficiencyLevel,
      updatedProficiencyLevel,
    }
  })

  // 產生測驗紀錄
  const createQuizRecord = await QuizRecord.create({
    userId: req.user?.userId,
    libraryId: quiz.libraryId,
    records,
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateVocabulary = async (record: any) => {
    const vocabulary = await Vocabulary.findById(record.vocabularyId)
    if (!vocabulary) return
  
    vocabulary.timesTested += 1
    vocabulary.proficiencyLevel = record.corrected
      ? Math.min(vocabulary.proficiencyLevel + 1, 5)
      : Math.max(vocabulary.proficiencyLevel - 1, 0)
    await vocabulary.save()
  }

  await Promise.all(records.map((record) => updateVocabulary(record)))

  // 刪除本測驗
  await Quiz.deleteOne({ _id: quizId })

  const scoreResult = {
    total: quizAnswer.length,
    scored: correctAnswersCount,
  }

  const lib = await Library.findById(quiz.libraryId)
  const vocabulary = await Vocabulary.find({
    libraryId: quiz.libraryId,
  })

  if (!lib) {
    throw new NotFoundError('LIBRARY_NOT_FOUND')
  }

  lib.onQuiz = false
  lib.averageLevel = proficiencyLevelMethod(vocabulary)
  await lib.save()

  res.status(StatusCodes.OK).json({
    msg: 'Answer submitted successfully',
    score: scoreResult,
    lib: lib,
    createQuizRecord: createQuizRecord,
  })
}