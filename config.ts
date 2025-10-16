import dotenv from 'dotenv'
import path from 'path'
dotenv.config({ path: path.resolve(process.cwd(), `.env.${ process.env.NODE_ENV || 'prod' }`) })

export default {
  port: process.env.PORT || '8000',
  environment: process.env.ENVIRONMENT as 'DEV' | 'PROD',
  mongodb_url: process.env.MONGO_URL,
  mongodb_db_name: process.env.MONGO_DB_NAME,
  mongodb_db_position: process.env.MONGO_DB_POSITION as 'GCP' | 'DOCKER',
  jwt_secret: process.env.JWT_SECRET,
  auth_token: process.env.AUTH_TOKEN as 'HEADER' | 'COOKIES',
  email_service_user: process.env.EMAIL_SERVICE_USER as string,
  email_service_pass: process.env.EMAIL_SERVICE_PASS as string,
}
