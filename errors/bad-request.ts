import { StatusCodes } from '../enums'
import { CustomAPIError } from './custom-api'

export class BadRequestError extends CustomAPIError {
  constructor (message: string) {
    super(message, StatusCodes.BAD_REQUEST)
  }
}
