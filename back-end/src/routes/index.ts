import { Router } from 'express'
import orphanagesRouter from './orphanages.routes'
import userRouter from './user.routes'

const routes = Router()

routes.use('/orphanages', orphanagesRouter)
routes.use('/users', userRouter)

export default routes
