import { CreateUser } from 'src/usecases/create-user/create-user'
import { HttpRequest } from '../ports/http-request'
import { HttpResponse } from '../ports/http-response'
import { created } from '../util/http-helper'

export class CreateUserController {
  private readonly useCase:CreateUser

  constructor (useCase:CreateUser) {
    this.useCase = useCase
  }

  async handle (request: HttpRequest):Promise<HttpResponse> {
    const userData = request.body
    const response = await this.useCase.perform(userData)
    return created(response.value)
  }
}
