import { Response } from 'express'

import { Service } from 'typedi'

import { UserModel } from '@database/models'
import { RequestWithUser } from '@shared/interfaces/requests'

@Service()
export class UserController {
  getUserProfile(req: RequestWithUser, res: Response) {
    const user = UserModel.toDto(req.user)
    res.json(user)
  }
}
