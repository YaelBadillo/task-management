import { Inject, Service } from 'typedi'

import { UserRepository } from '@database/repositories'
import { RegisterUserDto, UserDto } from '@shared/dtos'
import { Encrypter } from '@utils/encrypter'
import { UserModel } from '@database/models'

@Service()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    @Inject('bcrypt.encrypter') private readonly encrypter: Encrypter,
  ) {}

  async registerUser(registerUserDto: RegisterUserDto) {
    const encryptedPassword = await this.encrypter.encrypt(
      registerUserDto.password,
    )

    const user = await this.userRepository.registerUser({
      name: registerUserDto.name,
      password: encryptedPassword,
    })

    const userDto = UserModel.toDto(user)

    return userDto
  }
}
