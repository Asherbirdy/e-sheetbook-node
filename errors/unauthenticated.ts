import { StatusCodes } from '../enums'
import { CustomAPIError } from './custom-api'

export class UnauthenticatedError extends CustomAPIError {
  constructor (message: string) {
    super(message, StatusCodes.UNAUTHORIZED)
  }
}