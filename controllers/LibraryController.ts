import {
  CreateLibraryController,
  DeleteLibraryController,
  GetAllLibraryController,
  EditLibraryController,
  GetVocabularyFromLibController,
  InsertDefaultVocabularyToLibController,
  ExportLibraryJsonController,
  ImportJsonVocabularyToLibController,
} from './Library'

export const LibraryController = {
  create: CreateLibraryController,
  getAll: GetAllLibraryController,
  edit: EditLibraryController,
  delete: DeleteLibraryController,
  getVocabularyFromLib: GetVocabularyFromLibController,
  insertDefaultVocabularyToLib: InsertDefaultVocabularyToLibController,
  getLibraryExportJson: ExportLibraryJsonController,
  importJsonVocabularyToLib: ImportJsonVocabularyToLibController,
}