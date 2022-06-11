interface Address {
  street: string
  number: number
  neighborhood: string
  complement: string
  city: string
  state: string
}

export interface User {
  name: string
  email: string
  address: Address
}
