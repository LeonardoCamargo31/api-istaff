import { Express } from 'express'
import { createUserRoute } from '../routes/create-user-route'

export const setupRoutes = (app:Express):void => {
  app.use('/api', createUserRoute)
}
