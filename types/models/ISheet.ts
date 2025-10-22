import mongoose, { Document } from 'mongoose'

export interface ISheet extends Document {
  name: string;
  url: string;
  fileId: mongoose.Schema.Types.ObjectId;
  userId: mongoose.Schema.Types.ObjectId;
}