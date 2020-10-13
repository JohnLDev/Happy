import { Router } from 'express'

const routes = Router()

routes.get('/', (request, response) => {
  return response.json({ Message: 'Hello World' })
})

export default routes
