import { StatusCodes } from '../../enums'
import { BadRequestError } from '../../errors'
import Library from '../../models/Library'
import Vocabulary from '../../models/Vocabulary'
import { Req, Res } from '../../types'
import { proficiencyLevelMethod } from '../../utils'

export const ImportJsonVocabularyToLibController = async (req: Req, res: Res) => {
  const { jsonData, libraryId } = req.body

  if (!jsonData || !libraryId) {
    throw new BadRequestError('INVALID_REQUEST')
  }

  // 查是否有這 library 和 權限
  const userlibrary = await Library.findOne({
    _id: libraryId,
    userId: req.user?.userId,
  })
  if (!userlibrary) {
    throw new BadRequestError('USER_NOT_ACCESS_LIBRARY')
  }

  // 檢查當前庫的單字數量
  const currentlibrary = await Vocabulary.find({
    libraryId: libraryId,
    userId: req.user?.userId,
  })

  // 解析 JSON 資料
  let vocabularyDetails
  try {
    vocabularyDetails = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData
  } catch (error) {
    throw new BadRequestError('INVALID_JSON_FORMAT')
  }

  // 確保 vocabularyDetails 是陣列
  if (!Array.isArray(vocabularyDetails)) {
    throw new BadRequestError('JSON_DATA_MUST_BE_ARRAY')
  }

  // 檢查是否會超過庫大小限制 (100個單字)
  if (currentlibrary.length + vocabularyDetails.length > 100) {
    throw new BadRequestError('LIBRARY_SIZE_LIMIT')
  }

  const createdVocabularies = []
  const existingWords = []

  // 處理每個單字
  for (const vocab of vocabularyDetails) {
    const { word, translation, proficiencyLevel = 0 } = vocab

    if (!word || !translation) {
      continue // 跳過無效的單字
    }

    // 檢查這個library有沒有此字
    const findWordInCurrentLibrary = await Vocabulary.findOne({
      word: word,
      userId: req.user?.userId,
    })

    if (findWordInCurrentLibrary) {
      existingWords.push(word)
      continue // 跳過已存在的單字
    }

    // 創建新單字
    const newVocabulary = await Vocabulary.create({
      word,
      translation,
      proficiencyLevel: proficiencyLevel || 0,
      libraryId: libraryId,
      userId: req.user?.userId,
      timesTested: 0,
    })

    createdVocabularies.push(newVocabulary)
  }

  // 更新 library 單字總數 和 熟悉度
  if (createdVocabularies.length > 0) {
    const updatedLibrary = await Vocabulary.find({
      libraryId: libraryId,
      userId: req.user?.userId,
    })

    userlibrary.librarySize = updatedLibrary.length
    userlibrary.averageLevel = proficiencyLevelMethod(updatedLibrary)
    await userlibrary.save()
  }

  res.status(StatusCodes.OK).json({
    msg: 'Import Json Vocabulary To Lib successfully',
    createdCount: createdVocabularies.length,
    existingWords: existingWords,
    createdVocabularies: createdVocabularies
  })
}