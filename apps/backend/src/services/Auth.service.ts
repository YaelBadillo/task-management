import { LogInUserDto, RegisterUserDto } from 'shared'
import { Inject, Service } from 'typedi'

import { TokenRepository, UserRepository } from '@database/repositories'
import { Encrypter } from '@utils/encrypter'
import { UserModel } from '@database/models'
import { BadRequestException } from '@shared/exceptions'
import { Jwt } from '@utils/jwt'

@Service()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly tokenRepository: TokenRepository,
    @Inject('jsonwebtoken.jwt') private readonly jwt: Jwt,
    @Inject('bcrypt.encrypter') private readonly encrypter: Encrypter,
  ) {}

  async registerUser({ username, password }: RegisterUserDto) {
    let user = await this.userRepository.findOneByUsername(username)
    if (user)
      throw new BadRequestException(
        `Username ${username} is already taken, please choose another.`,
        'username',
      )

    const hashedPassword = await this.encrypter.encrypt(password)

    user = await this.userRepository.register({
      username,
      password: hashedPassword,
    })

    return UserModel.toDto(user)
  }

  async logIn({ username, password }: LogInUserDto) {
    const user = await this.userRepository.findOneByUsername(username)
    if (!user) throw new BadRequestException(`Incorrect user`, 'username')

    const arePasswordsEqual = await this.encrypter.compare(
      password,
      user.password,
    )
    if (!arePasswordsEqual)
      throw new BadRequestException('Incorrect password', 'password')

    let token = (await this.tokenRepository.findOneByUserId(user._id)).token
    if (!token) {
      token = this.jwt.sign(user.username)
      await this.tokenRepository.register(token, user._id)
    }

    return token
  }
}
