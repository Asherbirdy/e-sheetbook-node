import { Router } from 'express'
import { LibraryController } from '../controllers'
import { authenticateUser } from '../middleware'

const router = Router()

router.get(
  '/',
  authenticateUser,
  LibraryController.getAll
)

router.post(
  '/',
  authenticateUser,
  LibraryController.create
)

router.patch(
  '/',
  authenticateUser,
  LibraryController.edit
)

router.delete(
  '/',
  authenticateUser,
  LibraryController.delete
)

router.get(
  '/vocabularyFromLibraryId',
  authenticateUser,
  LibraryController.getVocabularyFromLib
)

router.post(
  '/insertDefaultVocabularyToLib',
  authenticateUser,
  LibraryController.insertDefaultVocabularyToLib
)

router.post(
  '/exportJson',
  authenticateUser,
  LibraryController.getLibraryExportJson
)

router.post(
  '/importJsonVocabularyToLib',
  authenticateUser,
  LibraryController.importJsonVocabularyToLib
)

export default router