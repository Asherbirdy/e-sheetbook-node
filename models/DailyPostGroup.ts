import mongoose, { Schema } from 'mongoose'

export interface IDailyPostGroup {
  name: string
  userId: mongoose.Schema.Types.ObjectId
}

const DailyPostGroupSchema: Schema<IDailyPostGroup> = new mongoose.Schema({
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

export default mongoose.model<IDailyPostGroup>('DailyPostGroup', DailyPostGroupSchema)
