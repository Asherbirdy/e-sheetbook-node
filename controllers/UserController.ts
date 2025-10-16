import {
  ShowCurrentUserController,
  UpdatePasswordController,
  GetAllUsersController,
  EditUserInfoController,
  ChangeUserAccessController
} from './User/index'

export const UserController = {
  showCurrentUser: ShowCurrentUserController,
  updatePassword: UpdatePasswordController,
  getAllUsers: GetAllUsersController,
  editUserInfo: EditUserInfoController,
  changeUserAccess: ChangeUserAccessController
}
