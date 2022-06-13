
import { app } from '../main/config/app'
import { MongoHelper } from '../infra/db/mongo-helper'
import path from 'path'
import * as dotenv from 'dotenv'

dotenv.config({ path: path.join(__dirname, '../../.env') })
const port = process.env.PORT

MongoHelper.connect(process.env.MONGO_URL)
  .then(async () => {
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`)
    })
  })
  .catch(err => {
    console.error(err)
  })
