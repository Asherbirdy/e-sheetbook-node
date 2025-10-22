import mongoose, { Document, Schema } from 'mongoose'

interface ISheet extends Document {
  name: string;
  url: string;
  fileId: mongoose.Schema.Types.ObjectId;
  userId: mongoose.Schema.Types.ObjectId;
}

const SheetSchema: Schema<ISheet> = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide name'],
  },
  url: {
    type: String,
    required: [true, 'Please provide url'],
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
})

export default mongoose.model<ISheet>('Sheet', SheetSchema)
