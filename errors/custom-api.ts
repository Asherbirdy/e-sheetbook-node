import { StatusCodes } from '../enums'

export class CustomAPIError extends Error {
  statusCode: StatusCodes
  constructor (message: string, statusCode: number) {
    super(message)
    this.statusCode = statusCode
  }
}
