import { Request, Response } from 'express'
import { Service } from 'typedi'

@Service()
export class AuthController {
  signUp(req: Request, res: Response) {
    console.log('xd')
    throw new Error('Method not implemented')
  }
}
