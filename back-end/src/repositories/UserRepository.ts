import { EntityRepository, Repository } from 'typeorm'

import User from '../models/User'

@EntityRepository(User)
class UserRepository extends Repository<User> {
  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = await this.findOne({
      where: { email: email },
    })

    return findUser
  }
}

export default UserRepository
