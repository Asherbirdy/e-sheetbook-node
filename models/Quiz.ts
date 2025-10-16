import mongoose, { Schema } from 'mongoose'
import { IUser } from '../types'

export interface IQuiz {
  userId: IUser
  libraryId: string
  quizVocabularyIds: mongoose.Types.ObjectId[]
}

const QuizSchema: Schema<IQuiz> = new Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Please provide userId!'],
    },
    libraryId: {
      type: String,
      required: true,
    },
    quizVocabularyIds: {
      type: [mongoose.Schema.ObjectId],
      ref: 'Vocabulary',
      required: [true, 'Please provide examination id!'],
    },
  },
  { timestamps: true }
)

const Quiz = mongoose.model<IQuiz>('Quiz', QuizSchema)

export default Quiz
