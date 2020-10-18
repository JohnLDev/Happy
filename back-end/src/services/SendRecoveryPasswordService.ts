import { getRepository } from 'typeorm'
import AppError from '../errors/AppError'
import User from '../models/User'
import mailer from '../config/nodemailer'
import { hash } from 'bcryptjs'

interface Request {
  email: string
}

class SendRecoveryPasswordService {
  public async execute({ email }: Request): Promise<void> {
    const usersRepository = getRepository(User)
    const user = await usersRepository.findOne(email)
    if (!user) {
      throw new AppError('Please insert a valid email', 400)
    }
    const newPassword = Math.random().toString(36)
    user.password = await hash(newPassword, 8)
    await mailer.sendMail({
      to: user.email,
      from: 'john-lenon2011@hotmail.com',
      subject: 'Happy Password Recovery✔', // Subject line
      text: `Você esqueceu sua senha? não tem problema, aqui está sua nova senha:${newPassword}`, // plain text body
      html:
        '<p> Você esqueceu sua senha? não tem problema, aqui está sua senha:  </p>',
    })
  }
}

export default SendRecoveryPasswordService
