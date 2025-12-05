import mongoose from 'mongoose'

export interface IWebsite {
  // Sheet configuration`
  googleSheetName: string
  googleSheetApiUrl: string
  googleSheetId: string
  googleSheetStartRow?: number
  googleSheetFields?: SheetFieldSchema[]

  // Website configuration
  websiteTitle?: string
  websiteDescription?: string
  websiteHtml?: string
  websiteStatus: 'active' | 'inactive'
  websitePassword?: string
  
  // User reference
  user?: mongoose.Types.ObjectId  
} 

export interface SheetFieldSchema {
  index: number
  name: string
  description: string
  type: 'text' | 'number' | 'date' | 'boolean' | 'blank' | 'select'
  options?: string[]
}