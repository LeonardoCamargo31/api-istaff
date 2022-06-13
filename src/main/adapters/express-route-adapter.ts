import { CreateUserController } from '../../web-controllers/create-user-controller/create-user-controller'
import { Request, Response } from 'express'
import { HttpRequest } from '../../web-controllers/ports/http-request'

export const adapterRoute = (controller:CreateUserController) => {
  return async (req: Request, res: Response) => {
    const httpRequest:HttpRequest = {
      body: req.body
    }
    const httpResponse = await controller.handle(httpRequest)
    res.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
