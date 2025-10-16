import { StatusCodes } from '../../enums'
import { BadRequestError, NotFoundError } from '../../errors'
import Library from '../../models/Library'
import { Req, Res } from '../../types'
import { defaultVocabulary } from '../../json/defaultVocabulary'
import Vocabulary from '../../models/Vocabulary'
import { proficiencyLevelMethod } from '../../utils'

export const InsertDefaultVocabularyToLibController = async (req: Req, res: Res) => {
  const { libraryId } = req.body

  if (!libraryId) {
    throw new BadRequestError('ALL_FIELDS_ARE_REQUIRED')
  }

  // 查是否是空 lib
  const library = await Library.findById(libraryId)
  if (library === null) {
    throw new NotFoundError('LIBRARY_NOT_FOUND')
  }

  if (library.librarySize > 0) {
    throw new BadRequestError('LIBRARY_SIZE_MUST_BE_EMPTY')
  }

  const formatJson = defaultVocabulary.map((vocabulary) => {
    return {
      word: vocabulary.word,
      translation: vocabulary.translation,
      proficiencyLevel: Math.floor(Math.random() * 6),
      timesTested: 0,
      libraryId: libraryId,
      userId: req.user?.userId,
      testFormat: vocabulary.testFormat,
    }
  })

  const insertVocabulary = await Vocabulary.insertMany(formatJson)

  library.librarySize = insertVocabulary.length
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  library.averageLevel = proficiencyLevelMethod(insertVocabulary as any)
  await library.save()

  res.status(StatusCodes.CREATED).json({
    msg: 'insertDefaultVocabulary',
    lib: library,
    vob: insertVocabulary,
  })
}