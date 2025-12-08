import {
  CreateWebsiteController,
  EditWebsiteGoogleSheetController,
  EditWebsiteDetailController,
  DeleteWebsiteController,
  GetAllWebsiteController
} from './Website'

export const WebsiteController = {
  create: CreateWebsiteController,
  editWebsiteSheet: EditWebsiteGoogleSheetController,
  editWebsiteDetail: EditWebsiteDetailController,
  delete: DeleteWebsiteController,
  getAll: GetAllWebsiteController
}
