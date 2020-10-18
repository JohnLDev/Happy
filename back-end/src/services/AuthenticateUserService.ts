import { compare } from 'bcryptjs'
import { getCustomRepository } from 'typeorm'
import User from '../models/User'
import { sign } from 'jsonwebtoken'
import authConfig from '../config/auth'
import AppError from '../errors/AppError'

import Dotenv from 'dotenv'
import UserRepository from '../repositories/UserRepository'
Dotenv.config()

interface Request {
  email: string
  password: string
}
interface Response {
  user: User
  token: string
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    if (!email || !password) {
      throw new AppError('Please insert email and password to login')
    }
    const userRepository = getCustomRepository(UserRepository)
    const user = await userRepository.findByEmail(email)
    if (!user) {
      throw new AppError('Incorrect email/password combination', 401)
    }

    const passwordMatched = await compare(password, user.password)

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination', 401)
    }

    const { secret, expiresIn } = authConfig.jwt

    const token = sign({}, secret as string, {
      subject: String(user.id),
      expiresIn: expiresIn,
    })

    return { user, token }
  }
}
export default AuthenticateUserService
