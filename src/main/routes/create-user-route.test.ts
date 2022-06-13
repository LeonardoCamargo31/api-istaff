import request from 'supertest'
import { app } from '../config/app'
import { MongoHelper } from '../../infra/db/mongo-helper'

describe('Create user route', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    await MongoHelper.clearCollection('users')
  })

  test('should return an account on success', async () => {
    await request(app)
      .post('/api/register')
      .send({
        name: 'Any name',
        email: 'any@mail.com'
      })
      .expect(201)
  })
})
