import mongoose, { Document } from 'mongoose'

export interface IApiConfig {
  name: string
  method: string
  url: string
}

export interface ISheet extends Document {
  name: string
  url: string
  api: IApiConfig[]
  fileId: mongoose.Schema.Types.ObjectId
  userId: mongoose.Schema.Types.ObjectId
}