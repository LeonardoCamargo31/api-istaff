import { UserRepository } from '../../repository/user-repository'
import { MongoHelper } from '../../infra/db/mongo-helper'
import { CreateUser } from './create-user'
import { User } from 'src/entities/user'

const userData:User = {
  name: 'any_name',
  email: 'any@email.com',
  address: {
    street: 'any_street',
    number: 123456,
    neighborhood: 'any_neighborhood',
    complement: 'any_complement',
    city: 'any_city',
    state: 'any_state'
  }
}

describe('Create user', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    await MongoHelper.clearCollection('users')
  })

  test('should create new user', async () => {
    const repository = new UserRepository()
    const usecase = new CreateUser(repository)
    await usecase.perform(userData)
    const user = await repository.findByEmail('any@email.com')
    expect(user.name).toBe('any_name')
  })

  test('should not create user if it already exists', async () => {
    const repository = new UserRepository()
    const usecase = new CreateUser(repository)
    await usecase.perform(userData)
    const response = await usecase.perform(userData)
    const responseError = response.value as Error
    expect(responseError.name).toEqual('UserAlreadyExistsError')
    expect(responseError.message).toEqual(`User with email ${userData.email} already exists.`)
  })
})
