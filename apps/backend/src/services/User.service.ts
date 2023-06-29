import { Inject, Service } from 'typedi'

import { UserRepository } from '@database/repositories'
import { LogInUserDto, RegisterUserDto } from '@shared/dtos'
import { Encrypter } from '@utils/encrypter'
import { UserModel } from '@database/models'
import { BadRequestException } from '@shared/exceptions'
import { Jwt } from '@utils/jwt'

@Service()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    @Inject('jsonwebtoken.jwt') private readonly jwtService: Jwt,
    @Inject('bcrypt.encrypter') private readonly encrypter: Encrypter,
  ) {}

  async registerUser({ username, password }: RegisterUserDto) {
    let user = await this.userRepository.findOneByUsername(username)
    if (user)
      throw new BadRequestException(
        `Username ${username} is already taken, please choose another.`,
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
    if (!user) throw new BadRequestException(`Incorrect user`)

    const arePasswordsEqual = await this.encrypter.compare(
      password,
      user.password,
    )
    if (!arePasswordsEqual) throw new BadRequestException('Incorrect password')

    const token = this.jwtService.sign(user.username)

    return token
  }
}
