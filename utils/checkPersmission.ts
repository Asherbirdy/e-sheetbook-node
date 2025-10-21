import mongoose, { ObjectId } from 'mongoose'
import { BadRequestError } from '../errors'

type checkPersmissionByUserIdPayload = (
  string |
  mongoose.Types.ObjectId |
  ObjectId
)

export const checkPersmissionByUserId = (
  requestUserId: checkPersmissionByUserIdPayload,
  resourceUserId: checkPersmissionByUserIdPayload
) => {
  if (requestUserId.toString() === resourceUserId.toString()) return
  throw new BadRequestError('NOT_AUTHORIZED_USER')
}