import { UserRepository } from './user-repository'
import { MongoHelper } from '../infra/db/mongo-helper'
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
    await repository.add(userData)
    const result = await repository.findByEmail(userData.email)
    expect(result.name).toBe('any_name')
    expect(result.email).toBe('any@email.com')
  })

  test('should find user by email', async () => {
    const repository = new UserRepository()
    await repository.add(userData)
    const result = await repository.findByEmail(userData.email)
    expect(result.name).toBe('any_name')
    expect(result.email).toBe('any@email.com')
  })

  test('should if user exists', async () => {
    const repository = new UserRepository()
    await repository.add(userData)
    const exists = await repository.exists(userData.email)
    expect(exists).toBeTruthy()
  })
})
