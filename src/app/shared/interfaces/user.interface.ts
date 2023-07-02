export interface User {
  id: number
  username: string
  email: string
  picture: string
  password: string
  roles: ['Admin' | 'User']
}
