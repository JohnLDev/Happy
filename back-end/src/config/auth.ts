import Dotenv from 'dotenv'
Dotenv.config()

export default {
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: '2h',
  },
}
