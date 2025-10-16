import { StatusCodes } from '../../enums'
import { Req, Res } from '../../types'
import { BadRequestError } from '../../errors'
import Vocabulary from '../../models/Vocabulary'
import { checkPersmission, getUserIdByString } from '../../utils'

export const EditVocabularyByIdController = async (req: Req, res: Res) => {
  const { vocabularyId } = req.query
  const { word, translation } = req.body
  
  if (!word || !translation) {
    throw new BadRequestError('FIELDS_REQUIRED')
  }

  const editWord = await Vocabulary.findOne({
    _id: vocabularyId,
    userId: req.user?.userId,
  })

  if (!editWord) {
    throw new BadRequestError('VOCABULARY_NOT_FOUND')
  }

  checkPersmission(req.user, getUserIdByString(editWord))

  editWord.word = word
  editWord.translation = translation
  await editWord.save()

  res.status(StatusCodes.OK).json({
    msg: 'Edit Success!',
    edit: editWord,
  })
}