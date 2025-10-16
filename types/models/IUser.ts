import { Document} from 'mongoose'
import { Role } from '../../enums'

export interface IUser extends Document {
  name: string
  email: string
  emailVerified: boolean
  OTP: string | undefined
  OTPCreatedTime: Date | undefined
  OTPAttempts: number
  isBlocked: boolean
  blockUntil: Date
  password: string
  role: Role
  // eslint-disable-next-line no-unused-vars
  comparePassword(candidatePassword: string): Promise<boolean>;
}