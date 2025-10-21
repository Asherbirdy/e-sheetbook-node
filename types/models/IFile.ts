import mongoose from 'mongoose'

export interface IFile {
  name: string
  userId: mongoose.Schema.Types.ObjectId
}