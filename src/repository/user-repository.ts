import { User } from 'src/entities/user'
import { MongoHelper } from '../infra/db/mongo-helper'

export class UserRepository {
  async add (user:User):Promise<void> {
    const userCollection = MongoHelper.getCollection('users')
    await userCollection.insertOne(user)
  }

  async findByEmail (email:string):Promise<any> {
    const userCollection = MongoHelper.getCollection('users')
    const result = await userCollection.findOne({ email })
    return result
  }

  async exists (email:string):Promise<boolean> {
    const result = await this.findByEmail(email)
    return !!result
  }
}
