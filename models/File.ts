import mongoose, { Schema } from 'mongoose'
import { IFile } from '../types'

const FileSchema: Schema<IFile> = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide name'],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide userId'],
  },
})

export default mongoose.model<IFile>('File', FileSchema)
