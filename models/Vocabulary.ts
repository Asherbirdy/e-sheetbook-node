import mongoose from 'mongoose'
import { IVocabulary, ITestFormat } from '../types'

const TestFormatSchema = new mongoose.Schema<ITestFormat>({
  firstLetter: {
    type: String,
  },
  lastLetter: {
    type: String,
  },
  middleDash: {
    type: Number,
  },
})

const VocabularySchema = new mongoose.Schema<IVocabulary>({
  word: {
    type: String,
    required: [true, 'Please provide word!'],
    validate: {
      validator: function (value: string) {
        const words = value.split(/\s+/) // 分割成單字
        return words.every((word) => /^[a-zA-Z]{3,}$/.test(word)) // 檢查每個單詞是否都是英文且長度至少為3
      },
      message: (props: { value: string }) =>
        `${ props.value } is not a valid phrase! Each word must contain only English letters and be longer than 1 character.`,
    },
  },
  // 單字的翻譯
  translation: {
    type: String,
    required: [true, 'Please provide translation'],
  },
  // 單字的熟悉度
  proficiencyLevel: {
    type: Number,
    required: [true, 'Please provide proficiencyLevel!'],
  },
  // 此單字被考多區次
  timesTested: {
    type: Number,
    required: [true, 'Please provide timesTested'],
  },
  libraryId: {
    type: String,
    required: [true, 'Please provide libraryId'],
  },
  userId: {
    type: String,
    required: [true, 'Please provide userId'],
  },
  testFormat: [TestFormatSchema],
})

VocabularySchema.pre('save', function (next) {
  if (this.word && this.word.length >= 3) {
    const words = this.word.split(/\s+/)
    this.testFormat = words.map((word) => ({
      firstLetter: word[ 0 ],
      lastLetter: word[ word.length - 1 ],
      middleDash: word.length - 2,
    }))
  }
  next()
})

export default mongoose.model<IVocabulary>('Vocabulary', VocabularySchema)