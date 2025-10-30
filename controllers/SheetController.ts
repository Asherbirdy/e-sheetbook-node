import { GetAllSheetController, CreateSheetController, EditSheetController, DeleteSheetController, GetSheetFromFIleController } from './Sheet'

export const SheetController = {
  getAllSheet: GetAllSheetController,
  createSheet: CreateSheetController,
  editSheet: EditSheetController,
  deleteSheet: DeleteSheetController,
  getSheetFromFIle: GetSheetFromFIleController
}