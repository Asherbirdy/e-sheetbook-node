import { StatusCodes } from '../enums'
import { CustomAPIError } from './custom-api'

export class NotFoundError extends CustomAPIError {
  constructor (message: string) {
    super(message, StatusCodes.NOT_FOUND)
  }
}
