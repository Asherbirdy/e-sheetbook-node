import { Document } from 'mongoose'

export interface IRegister extends Document {
  name: string
  email: string
  password: string
  OTP: string | undefined
  OTPCreatedTime: Date | undefined
  OTPAttempts: number
  isBlocked: boolean
  blockUntil: Date
  verified: boolean
  createdAt: Date
  expiresAt: Date
}
