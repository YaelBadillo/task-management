import { Service } from 'typedi'

import { UserRepository } from '@database/repositories'
import { UnauthorizedException } from '@shared/exceptions'
import { JwtService } from '@utils/jwt'
import { BaseAuthMiddleware } from '@middlewares/auth/BaseAuth.middleware'

@Service()
export class AuthMiddleware extends BaseAuthMiddleware {
  constructor(
    protected readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
  ) {
    super()
  }

  protected async validate({ userName }: { userName: string }) {
    const user = await this.userRepository.findOneByUsername(userName)
    if (!user)
      throw new UnauthorizedException('User not found, please authenticate.')

    return user
  }
}
