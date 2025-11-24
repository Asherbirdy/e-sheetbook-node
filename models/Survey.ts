import mongoose, { Schema } from 'mongoose'

interface ISurvey {
  name: string
  options: mongoose.Schema.Types.ObjectId[]
  expiresAt: Date
  userId: mongoose.Schema.Types.ObjectId
}

const SurveySchema: Schema<ISurvey> = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide name'],
  },
  options: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SurveyOption',
  }],
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
