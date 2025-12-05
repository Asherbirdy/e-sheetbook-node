import mongoose, { Schema } from 'mongoose'
import { IWebsite } from '../types/models/IWebsite'

const SheetFieldSchema: Schema = new Schema({
  index: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['text', 'number', 'date', 'boolean','blank'],
    required: true,
  },

  options: {
    type: [String],
  },
})

const WebsiteSchema: Schema = new Schema<IWebsite>(
  {
    googleSheetName: {
      type: String,
      default: 'New Sheet!',
    },
    googleSheetApiUrl: {
      type: String,
      required: true,
    },
    googleSheetId: {
      type: String,
      required: true,
    },
    googleSheetStartRow: {
      type: Number,
    },
    googleSheetFields: {
      type: [SheetFieldSchema],
    },

    // Website configuration
    websiteTitle: {
      type: String,
    },
    websiteDescription: {
      type: String,
    },
    websiteHtml: {
      type: String,
    },
    websiteStatus: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'inactive',
      required: true,
    },
    websitePassword: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
)

const Website = mongoose.model<IWebsite>('Website', WebsiteSchema)

export default Website
