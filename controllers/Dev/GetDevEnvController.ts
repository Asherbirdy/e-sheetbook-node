import { StatusCodes } from '../../enums'
import config from '../../config'
import { Req, Res } from '../../types'

export const GetDevEnvController =async (req: Req, res: Res) => {
  res.status(StatusCodes.OK).json( {
    msg: 'DevController_GET',
    envPort: config.environment
  } )
}
