import { getRepository } from 'typeorm'
import User from '../models/User'
import { hash } from 'bcryptjs'
import AppError from '../errors/AppError'
import { validate } from 'class-validator'

interface Request {
  name: string | undefined
  email: string
  password: string
}

class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const usersRepository = getRepository(User)

    if (!email || !password) {
      throw new AppError(
        'Please insert email and password to create a new user.',
      )
    }
    const checkUserExist = await usersRepository.findOne({
      where: { email: email },
    })
    if (checkUserExist) {
      throw new AppError('Email adress already used')
    }

    const hashedPassword = await hash(password, 8)
    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
    })

    const errors = await validate(user)
    if (errors.length !== 0) {
      throw new AppError('Email adress is invalid')
    }
    await usersRepository.save(user)
    return user
  }
}

export default CreateUserService
