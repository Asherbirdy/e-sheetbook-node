import {
  GetDevEnvController,
  SetDevDistrictController,
  DeleteNonVerifiedEmailAccountController,
  CheckIpController,
} from './Dev/index'

export const DevController = {
  // ** 
  get: GetDevEnvController,
  // **
  setDevDistrict: SetDevDistrictController,
  // **
  deleteNonVerifiedEmailAccount: DeleteNonVerifiedEmailAccountController,
  // **
  checkIp: CheckIpController,
}
