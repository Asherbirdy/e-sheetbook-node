import { StatusCodes } from '../../enums'
import { BadRequestError } from '../../errors'
import Library from '../../models/Library'
import Vocabulary from '../../models/Vocabulary'
import { Req, Res } from '../../types'

export const ExportLibraryJsonController = async (req: Req, res: Res) => {
  const { libraryId } = req.body

  const library = await Library.findById(libraryId)

  if (!library) {
    throw new BadRequestError('LIBRARY_NOT_FOUND')
  }

  const vocabularyDetails = await Vocabulary.find({ libraryId })

  const result = vocabularyDetails.map((item) => ({
    word: item.word,
    translation: item.translation,
    proficiencyLevel: item.proficiencyLevel
  }))

  res.setHeader('Content-Disposition', `attachment; filename="${ new Date().toISOString() }-${ library?.title }.json"`)
  res.setHeader('Content-Type', 'application/json')
  res.status(StatusCodes.OK).send(JSON.stringify(result))
}