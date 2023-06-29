import path from 'path'

import { Request, Response } from 'express'

import { Service } from 'typedi'

@Service()
export class StaticController {
  serve(req: Request, res: Response) {
    return res.sendFile(
      path.join(__dirname, '../../../', 'frontend/dist/index.html'),
    )
  }
}
