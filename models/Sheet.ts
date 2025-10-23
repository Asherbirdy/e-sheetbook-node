import mongoose, { Schema } from 'mongoose'
import { ISheet } from '../types'

const SheetSchema: Schema<ISheet> = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide name'],
  },
  url: {
    type: String,
    required: [true, 'Please provide url'],
  },
  api: {
    type: String,
  },
  fileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'File',
    required: [true, 'Please provide file'],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide userId'],
  },
}, { timestamps: true })

export default mongoose.model<ISheet>('Sheet', SheetSchema)
