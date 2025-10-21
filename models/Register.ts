import mongoose, { Schema } from 'mongoose'
import validator from 'validator'
import { IRegister } from '../types'

const RegisterSchema: Schema<IRegister> = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please provide email'],
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: 'Please provide valid email',
    },
  },
  OTP: {
    type: String,
  },
  OTPCreatedTime: {
    type: Date || undefined,
  },
  OTPAttempts: {
    type: Number,
    default: 0,
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
  blockUntil: {
    type: Date,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expiresAt: {
    type: Date,
    default: () => new Date(Date.now() + 15 * 60 * 1000), // 15 minutes from now
    index: { expires: 0 }, 
  },
})

export default mongoose.model<IRegister>('Register', RegisterSchema)
