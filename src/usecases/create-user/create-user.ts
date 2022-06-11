import { User } from '../../entities/user'
import { UserRepository } from '../../repository/user-repository'
import { Either, left, right } from '../../shared/either'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

export class CreateUser {
  private readonly userRepository:UserRepository

  constructor (userRepository:UserRepository) {
    this.userRepository = userRepository
  }

  async perform (user: User):Promise<Either<UserAlreadyExistsError, User>> {
    const exists = await this.userRepository.exists(user.email)
    if (exists) {
      return left(new UserAlreadyExistsError(user.email))
    }

    await this.userRepository.add(user)
    return right(user)
  }
}
