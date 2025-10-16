import mongoose from 'mongoose'
import { IUser } from '../types'

export interface IRecord {
  word: string
  translation: string
  userAnswer: string
  corrected: boolean
  originalProficiencyLevel: number
  updatedProficiencyLevel: number
}

export interface IQuizRecord {
  userId: IUser
  libraryId: string
  records: IRecord[]
}

const RecordSchema = new mongoose.Schema<IRecord>({
  word: {
    type: String,
    required: [true, 'Please provide word!'],
  },
  translation: {
    type: String,
    required: [true, 'Please provide translation!'],
  },
  userAnswer: {
    type: String,
    required: [true, 'Please provide user answer!'],
  },
  corrected: {
    type: Boolean,
    required: [true, 'Please specify if the answer was corrected!'],
  },
  originalProficiencyLevel: {
    type: Number,
    required: [true, 'Please provide user originalProficiencyLevel!'],
  },
  updatedProficiencyLevel: {
    type: Number,
    required: [true, 'Please provide user updateProficiencyLevel!'],
  },
})

const QuizRecordSchema = new mongoose.Schema<IQuizRecord>(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Please provide userId!'],
    },
    libraryId: {
      type: String,
      required: [true, 'Please provide libraryId!'],
    },
    records: [RecordSchema],
  },
  { timestamps: true }
)

const QuizRecord = mongoose.model<IQuizRecord>('QuizRecord', QuizRecordSchema)

export default QuizRecord
