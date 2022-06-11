import { UserRepository } from './user-repository'
import { MongoHelper } from '../infra/db/mongo-helper'

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
    const name = 'any_name'
    const email = 'any@email.com'
    await repository.add({ name, email })
    const result = await repository.findByEmail(email)
    expect(result.name).toBe('any_name')
    expect(result.email).toBe('any@email.com')
  })

  test('should find user by email', async () => {
    const repository = new UserRepository()
    const name = 'any_name'
    const email = 'any@email.com'
    await repository.add({ name, email })
    const result = await repository.findByEmail(email)
    expect(result.name).toBe('any_name')
    expect(result.email).toBe('any@email.com')
  })

  test('should if user exists', async () => {
    const repository = new UserRepository()
    const name = 'any_name'
    const email = 'any@email.com'
    await repository.add({ name, email })
    const exists = await repository.exists(email)
    expect(exists).toBeTruthy()
  })
})
