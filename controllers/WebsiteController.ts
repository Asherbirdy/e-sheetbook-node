import {
  CreateWebsiteController,
  EditWebsiteGoogleSheetController,
  EditWebsiteDetailController,
  DeleteWebsiteController
} from './Website'

export const WebsiteController = {
  create: CreateWebsiteController,
  editWebsiteSheet: EditWebsiteGoogleSheetController,
  editWebsiteDetail: EditWebsiteDetailController,
  delete: DeleteWebsiteController
}
