
import { Request, Response } from 'express'
import mongoose from 'mongoose'
import { Role } from '../../enums'

export interface Req extends Request {
  user?: {
    userId: string | mongoose.Types.ObjectId
    role: Role
    districtId: string
  }
}

export type Res = Response

// TODO: 有一天把全部 API 的 Response 都改成這樣
// export interface Res extends Response {
//   msg: string
//   json: (body: { msg: string; [key: string]: any }) => this
// }
