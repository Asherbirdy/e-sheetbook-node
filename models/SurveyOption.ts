import mongoose, { Schema } from 'mongoose'

export enum SurveyOptionType {
  'BOOLEAN' = 'boolean', // 是/否選項，例如：不訂餐
  'QUANTITY' = 'quantity' // 數量選項，例如：雞腿便當
}

export interface ISurveyOption {
  name: string
  type: SurveyOptionType
  surveyId: mongoose.Schema.Types.ObjectId
}

const SurveyOptionSchema: Schema<ISurveyOption> = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide option name'],
  },
  type: {
    type: String,
    enum: Object.values(SurveyOptionType),
    required: [true, 'Please provide option type'],
  },
  surveyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Survey',
    required: [true, 'Please provide surveyId'],
  },
}, { timestamps: true })

export default mongoose.model<ISurveyOption>('SurveyOption', SurveyOptionSchema)
