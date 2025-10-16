import { StatusCodes } from '../../enums'
import Library from '../../models/Library'
import Vocabulary from '../../models/Vocabulary'
import { Req, Res } from '../../types'
import { checkPersmission } from '../../utils'
import { getUserIdByString } from '../../utils'

export const GetVocabularyFromLibController = async (req: Req, res: Res) => {
  const { libraryId } = req.query
  const library = await Library.findById(libraryId)

  if (!library) {
    return res.status(StatusCodes.NOT_FOUND).json({
      msg: `Library with id ${ libraryId } not found`,
    })
  }

  const getAllWords = await Vocabulary.find({
    libraryId: libraryId,
  })
  
  checkPersmission(req.user, getUserIdByString(library))
  
  getAllWords.sort((a, b) => a.proficiencyLevel - b.proficiencyLevel)

  res.status(StatusCodes.OK).json({
    msg: `Get All Vocabulary from Library id ${ libraryId }`,
    library: library,
    count: getAllWords.length,
    allVocabulary: getAllWords,
  })
}