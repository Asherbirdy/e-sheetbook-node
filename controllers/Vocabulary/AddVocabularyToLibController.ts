import { StatusCodes } from '../../enums'
import { Req, Res } from '../../types'
import { BadRequestError } from '../../errors'
import Library from '../../models/Library'
import Vocabulary from '../../models/Vocabulary'
import { proficiencyLevelMethod } from '../../utils'

export const AddVocabularyToLibController = async (req: Req, res: Res) => {
  const { libraryId, word, translation } = req.body

  if (!libraryId || !word || !translation) {
    throw new BadRequestError('FIELDS_REQUIRED')
  }

  // 查是否有這 library 和 權限
  const userlibrary = await Library.findOne({
    _id: libraryId,
    userId: req.user?.userId,
  })
  if (!userlibrary) {
    throw new BadRequestError('USER_NOT_ACCESS_LIBRARY')
  }

  // 檢查這個library有沒有此字
  const findWordInCurrentLibrary = await Vocabulary.find({
    word: word,
    userId: req.user?.userId,
  })
  if (findWordInCurrentLibrary.length > 0) {
    throw new BadRequestError('WORD_ALREADY_EXISTS')
  }

  const currentlibrary = await Vocabulary.find({
    libraryId: libraryId,
    userId: req.user?.userId,
  })

  // 一個lib不能超過100單字
  if (currentlibrary.length >= 100) {
    throw new BadRequestError('LIBRARY_SIZE_LIMIT')
  }

  const addWord = await Vocabulary.create({
    word,
    translation,
    libraryId: libraryId,
    userId: req.user?.userId,
    proficiencyLevel: 0,
    timesTested: 0,
  })

  const updateLibrary = await Vocabulary.find({
    libraryId: libraryId,
    userId: req.user?.userId,
  })

  // 更新 library 單字總數 和 熟悉度
  userlibrary.librarySize = userlibrary.librarySize + 1
  userlibrary.averageLevel = proficiencyLevelMethod(updateLibrary)
  await userlibrary.save()

  res.status(StatusCodes.OK).json({
    msg: 'Vocabulary added to library successfully',
    data: addWord
  })
}