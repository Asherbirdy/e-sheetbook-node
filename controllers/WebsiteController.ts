import {
  CreateWebsiteController,
  EditWebsiteGoogleSheetController,
  EditWebsiteDetailController,
} from './Website'

export const WebsiteController = {
  create: CreateWebsiteController,
  editWebsiteSheet: EditWebsiteGoogleSheetController,
  editWebsiteDetail: EditWebsiteDetailController,
}
