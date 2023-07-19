import { Request } from 'express'

import { IUser } from '@database/models'

export interface RequestWithUser extends Request {
  user?: IUser
}
