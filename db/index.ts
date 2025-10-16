import mongoose from 'mongoose'
import config from '../config'
mongoose.set('strictQuery', false)

export const connectDB = (url: string, dbName: string) => {
  if(config.environment === 'DEV') {
    if(config.mongodb_db_position === 'GCP') {
      const connectionUrl = `${ url }/${ dbName }?authSource=admin`
      return mongoose.connect(connectionUrl)
    }
    // DOCKER測試連結 不要刪掉
    if(config.mongodb_db_position === 'DOCKER') {
      const connectionUrl = `mongodb://127.0.0.1:27017/${ dbName }?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.1.0`
      return mongoose.connect(connectionUrl)
    }
  }

  if(config.environment === 'PROD') {
    const connectionUrl = `${ url }/${ dbName }?authSource=admin`
    return mongoose.connect(connectionUrl)
  }
}

