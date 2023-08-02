import { Response } from 'express'
import { Service } from 'typedi'

import { UserModel } from '@database/models'

@Service()
export class UserController {
  getUserProfile(req: Requests.WithUser, res: Response) {
    const user = UserModel.toDto(req.user)
    res.json(user)
  }
}
