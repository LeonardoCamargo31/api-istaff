export class UserAlreadyExistsError extends Error {
  public readonly name='UserAlreadyExistsError'
  constructor (param:string) {
    super(`User with email ${param} already exists.`)
  }
}
