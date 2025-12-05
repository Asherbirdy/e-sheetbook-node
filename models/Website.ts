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
    // Sheet configuration
    sheetName: {
      type: String,
      required: true,
    },
    sheetApiUrl: {
      type: String,
      required: true,
    },
    sheetId: {
      type: String,
      required: true,
    },
    
    sheetStartRow: {
      type: Number,
    },
    sheetFields: {
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
      default: 'active',
      required: true,
    },
    websitePassword: {
      type: String,
    },

    // User reference
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
)

const Website = mongoose.model<IWebsite>('Website', WebsiteSchema)

export default Website
