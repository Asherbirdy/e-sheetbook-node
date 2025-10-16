import mongoose, { Schema } from 'mongoose'
import { ILibrary } from '../types'

const LibrarySchema: Schema<ILibrary> = new Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Please provide userId!'],
    },
    title: {
      type: String,
      required: [true, 'Please provide title!'],
    },
    averageLevel: {
      type: Number,
      required: [true, 'Please provide averageLevel'],
    },
    // 本單字庫的單字量
    librarySize: {
      type: Number,
      required: [true, 'Please provide librarySize'],
    },
    onQuiz: {
      type: Boolean,
      required: [true, 'Please provide onQuiz'],
    },
  },
  { timestamps: true }
)

const Library = mongoose.model<ILibrary>('Library', LibrarySchema)

export default Library
