import mongoose, { Schema } from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'
import { IUser } from '../types'
import { Role } from '../enums'

const UserSchema: Schema<IUser> = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide name'],
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: 'Please provide valid email',
    },
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
  OTP: {
    type: String || undefined,
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
  password: {
    type: String,
    required: [true, 'Please provide password'],
    minlength: 6,
  },
  role: {
    type: String,
    enum: Object.values(Role),
    default: Role.user,
  },
})

UserSchema.pre<IUser>('save', async function (next) {
  // console.log(this.modifiedPaths())
  // console.log(this.isModified('name'))
  // 如果 save 不是 password (不要加密)！
  if (!this.isModified('password')) return next()
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

UserSchema.methods.comparePassword = async function (canditatePassword: string): Promise<boolean> {
  const isMatch = await bcrypt.compare(canditatePassword, this.password)
  return isMatch
}

export default mongoose.model<IUser>('User', UserSchema)
