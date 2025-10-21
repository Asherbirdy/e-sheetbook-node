import { GetFileController, CreateFileController, EditFileController, DeleteFileController } from './File/index'

export const FileController = {
  get: GetFileController,
  post: CreateFileController,
  put: EditFileController,
  delete: DeleteFileController,
}