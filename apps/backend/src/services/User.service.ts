import { Inject, Service } from 'typedi'

import { UserRepository } from '@database/repositories'
import { RegisterUserDto } from '@shared/dtos'
import { Encrypter } from '@utils/encrypter'
import { UserModel } from '@database/models'
import { BadRequestException } from '@shared/exceptions'

@Service()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    @Inject('bcrypt.encrypter') private readonly encrypter: Encrypter,
  ) {}

  async registerUser({ name, password }: RegisterUserDto) {
    let user = await this.userRepository.findOneByName(name)
    if (user)
      throw new BadRequestException(
        `Name ${name} is already taken, please choose another.`,
      )

    const hashedPassword = await this.encrypter.encrypt(password)

    user = await this.userRepository.register({
      name: name,
      password: hashedPassword,
    })

    return UserModel.toDto(user)
  }
}
