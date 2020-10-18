import { Router } from 'express'
import UsersControler from '../controllers/UsersControler'
import ensureAuthenticated from '../middleware/ensureAuthenticate'

const userRouter = Router()

userRouter.post('/login', UsersControler.login)
userRouter.post('/signup', UsersControler.signup)
userRouter.post('/passwordrecovery', UsersControler.recovery)
userRouter.post('/', ensureAuthenticated, (request, response) => {
  return response.json({ message: 'Logged in' })
})
export default userRouter
