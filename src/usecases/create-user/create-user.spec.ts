import { UserRepository } from '../../repository/user-repository'
import { MongoHelper } from '../../infra/db/mongo-helper'
import { CreateUser } from './create-user'

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
    const name = 'any_name'
    const email = 'any@email.com'
    await usecase.perform({ name, email })
    const user = await repository.findByEmail('any@email.com')
    expect(user.name).toBe('any_name')
  })
})
