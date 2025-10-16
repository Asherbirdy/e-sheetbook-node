import {
  UserRegisterController,
  LoginController,
  LogoutController,
  RefreshTokenController,
  SendOTPController,
  bindOTPEmailController,
  ForgetPasswordEmailOTPController,
  ChangePasswordWithOTPController,
  CheckValidTokenController
} from './Auth'

export const AuthController = {
  /* 
    * User Register
  */
  userRegister: UserRegisterController,
  login: LoginController,
  logout: LogoutController,
  refreshToken: RefreshTokenController,
  /*
    * Send OTP
  */
  sendOTP: SendOTPController,
  /*
    * Bind OTP Email
  */
  bindOTPEmail: bindOTPEmailController,
  // TODO Add OTP to phone number
  /*
    * Forget Password Email OTP
  */
  forgetPasswordEmailOTP: ForgetPasswordEmailOTPController,
  /*
    * Change Password With OTP
  */
  changePasswordWithOTP: ChangePasswordWithOTPController,
  /*
    * Check Valid
  */
  checkValidToken: CheckValidTokenController
}
