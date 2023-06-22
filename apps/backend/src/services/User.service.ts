import { Service } from 'typedi'

import { UserRepository } from '../database/repositories'
import { RegisterUserDto, UserDto } from '../shared/dtos'

@Service()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async registerUser(registerUserDto: RegisterUserDto) {
    const user = await this.userRepository.registerUser({
      name: registerUserDto.name,
      password: registerUserDto.password,
    })

    const userDto = new UserDto()
    if (user) {
      userDto.name = user.name
      userDto.createdAt = user.createdAt
      userDto.updatedAt = user.updatedAt
    }

    return userDto
  }
}
