import { AddVocabularyToLibController, EditVocabularyByIdController, DeleteVocabularyByIdController, CheckExistsVobInOtherLibraryController } from './Vocabulary'

export const VocabularyController = {
  addVocabularyToLib: AddVocabularyToLibController,
  editbyId: EditVocabularyByIdController,
  deletebyId: DeleteVocabularyByIdController,
  checkExistsVobInOtherLibrary: CheckExistsVobInOtherLibraryController,
}