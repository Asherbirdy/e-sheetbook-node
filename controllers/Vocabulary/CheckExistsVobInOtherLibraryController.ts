import { StatusCodes } from '../../enums'
import { Req, Res } from '../../types'
import Vocabulary from '../../models/Vocabulary'

export const CheckExistsVobInOtherLibraryController = async (req: Req, res: Res) => {
  const { word } = req.body

  const findExistVocabulary = await Vocabulary.find({
    userId: req.user?.userId,
    word: word,
  }).populate({
    path: 'libraryId',
    model: 'Library',
    select: '-_id -__v -averageLevel -librarySize',
  })

  // 如果單字有在其他library重複
  if (findExistVocabulary.length > 0) {
    res.status(StatusCodes.OK).json({
      msg: `word:${ word } is exist in ${ findExistVocabulary.length } library!`,
      repeat: true,
      word: findExistVocabulary,
    })
  }

  res.status(StatusCodes.OK).json({
    msg: `word:${ word } does not exist in your other library!`,
    repeat: false,
    word: findExistVocabulary,
  })
}