import request from 'supertest'
import { app } from '../config/app'

describe('CORS middleware', () => {
  test('should enable CORS', async () => {
    app.get('/test_enable_cors', (req, res) => {
      res.send()
    })

    await request(app)
      .get('/test_enable_cors')
      .expect('access-control-allow-origin', '*')
      .expect('access-control-allow-headers', '*')
      .expect('access-control-allow-methods', '*')
  })
})
