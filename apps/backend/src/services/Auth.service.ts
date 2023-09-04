import { ObjectId } from 'mongoose'
import { LogInUserDto, RegisterUserDto } from 'shared'
import { Inject, Service } from 'typedi'

import { TokenRepository, UserRepository } from '@database/repositories'
import { EncrypterService } from '@utils/encrypter'
import { UserModel } from '@database/models'
import {
  BadRequestException,
  InternalServerErrorException,
} from '@shared/exceptions'
import { Jwt } from '@utils/jwt'

@Service()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly tokenRepository: TokenRepository,
    @Inject('jsonwebtoken.jwt') private readonly jwt: Jwt,
    private readonly encrypterService: EncrypterService,
  ) {}

  async registerUser({ username, password }: RegisterUserDto) {
    let user = await this.userRepository.findOneByUsername(username)
    if (user)
      throw new BadRequestException(
        `Username ${username} is already taken, please choose another.`,
        'username',
      )

    const hashedPassword = await this.encrypterService.encrypt(password)

    user = await this.userRepository.register({
      username,
      password: hashedPassword,
    })

    return UserModel.toDto(user)
  }

  async logIn({ username, password }: LogInUserDto) {
    const user = await this.userRepository.findOneByUsername(username)
    if (!user) throw new BadRequestException(`Incorrect user`, 'username')

    const arePasswordsEqual = await this.encrypterService.compare(
      password,
      user.password,
    )
    if (!arePasswordsEqual)
      throw new BadRequestException('Incorrect password', 'password')

    let token: string | undefined = (
      await this.tokenRepository.findOneByUserId(user._id)
    )?.token
    if (!token) {
      token = this.jwt.sign(user.username)
      await this.tokenRepository.register(token, user._id)
    }

    return token
  }

  async logOut(token: string, userId: ObjectId): Promise<void> {
    const { acknowledged: isTokenDeleted } =
      await this.tokenRepository.deleteOneByTokenAndUserId(token, userId)
    if (!isTokenDeleted)
      throw new InternalServerErrorException(
        'An unexpected error ocurred while logging out.',
      )
  }
}
