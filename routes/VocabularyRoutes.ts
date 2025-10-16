import { Router } from 'express'
import { VocabularyController } from '../controllers'
import { authenticateUser } from '../middleware'
const router = Router()

router.post(
  '/addVocabularyToLibrary',
  authenticateUser,
  VocabularyController.addVocabularyToLib
)

router.put(
  '/',
  authenticateUser,
  VocabularyController.editbyId
)

router.delete(
  '/',
  authenticateUser,
  VocabularyController.deletebyId
)

router.get(
  '/checkExistsVobInOtherLibrary',
  authenticateUser,
  VocabularyController.checkExistsVobInOtherLibrary
)

export default router