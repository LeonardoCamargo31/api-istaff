import { MongoHelper } from '../../infra/db/mongo-helper'
import { UserRepository } from '../../repository/user-repository'
import { CreateUser } from '../../usecases/create-user/create-user'
import { HttpRequest } from '../ports/http-request'
import { HttpResponse } from '../ports/http-response'
import { CreateUserController } from './create-user-controller'

const makeSut = () => {
  const repository = new UserRepository()
  const useCase = new CreateUser(repository)
  const sut = new CreateUserController(useCase)
  return {
    sut
  }
}

describe('Create user web controller', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    await MongoHelper.clearCollection('users')
  })

  test('should return status code 201 when request contains valid user data', async () => {
    const { sut } = makeSut()
    const request:HttpRequest = {
      body: {
        name: 'Any name',
        email: 'any@email.com'
      }
    }

    const response : HttpResponse = await sut.handle(request)
    expect(response.statusCode).toEqual(201)
    expect(response.body).toEqual(request.body)
  })
})
