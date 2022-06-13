import { CreateUserController } from '../../web-controllers/create-user-controller/create-user-controller'
import { CreateUser } from '../../usecases/create-user/create-user'
import { UserRepository } from '../../repository/user-repository'

export const makeCreateUserController = ():CreateUserController => {
  const userRepository = new UserRepository()
  const createUser = new CreateUser(userRepository)
  const createUserController = new CreateUserController(createUser)
  return createUserController
}
