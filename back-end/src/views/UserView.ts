import User from '../models/User'
interface Response {
  id: number
  name: string
  email: string
  created_at: Date
  updated_at: Date
}
export default {
  render(user: User): Response {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
    }
  },
}
