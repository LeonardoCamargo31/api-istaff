import { User } from 'src/entities/user'
import { UserRepository } from 'src/repository/user-repository'

export class CreateUser {
  private readonly userRepository:UserRepository

  constructor (userRepository:UserRepository) {
    this.userRepository = userRepository
  }

  async perform (user: User):Promise<User> {
    await this.userRepository.add(user)
    return user
  }
}
