import mongoose, { Schema } from 'mongoose'

interface ISurvey {
  name: string
  options: string[]
  expiresAt: Date
  userId: mongoose.Schema.Types.ObjectId
}

const SurveySchema: Schema<ISurvey> = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide name'],
  },
  options: {
    type: [String],
    required: [true, 'Please provide options'],
  },
  expiresAt: {
    type: Date,
    required: [true, 'Please provide expiresAt'],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide userId'],
  },
}, { timestamps: true })

export default mongoose.model<ISurvey>('Survey', SurveySchema)
