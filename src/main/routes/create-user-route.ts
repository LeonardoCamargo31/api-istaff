import { Router } from 'express'
import { adapterRoute } from '../adapters/express-route-adapter'
import { makeCreateUserController } from '../factories/create-user-factory'

const createUserRoute = Router()
createUserRoute.post('/register', adapterRoute(makeCreateUserController()))
export { createUserRoute }
