import { Request, Response } from 'express'

import UserView from '../views/UserView'
import AuthenticateUserService from '../services/AuthenticateUserService'
import CreateUserService from '../services/CreateUserService'
import AppError from '../errors/AppError'
import SendRecoveryPasswordService from '../services/SendRecoveryPasswordService'

export default {
  async login(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body
    const authenticateUserService = new AuthenticateUserService()
    const { user, token } = await authenticateUserService.execute({
      email,
      password,
    })
    return response.status(200).json({
      user: UserView.render(user),
      token,
    })
  },

  async signup(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body
    const createUserService = new CreateUserService()
    const user = await createUserService.execute({
      name,
      email,
      password,
    })
    return response.status(201).json(UserView.render(user))
  },

  async recovery(request: Request, response: Response): Promise<Response> {
    const { email } = request.body

    if (!email) {
      throw new AppError('Please insert a valid email', 400)
    }
    const sendRecoveryPasswordService = new SendRecoveryPasswordService()
    await sendRecoveryPasswordService.execute(email)
    return response
      .status(200)
      .json({ message: 'verify your email to get a new password' })
  },
}
