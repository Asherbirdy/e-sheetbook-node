import mongoose from 'mongoose'

export interface IWebsite {
  // Sheet configuration`
  sheetName: string
  sheetApiUrl: string
  sheetId: string
  sheetStartRow?: number
  sheetFields?: SheetFieldSchema[]

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
  type: 'text' | 'number' | 'date' | 'boolean';
}