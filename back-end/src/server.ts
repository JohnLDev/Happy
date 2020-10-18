import express, { Request, Response, NextFunction } from 'express'
import 'reflect-metadata'
import 'express-async-errors'
import './database'
import path from 'path'
import ErrorHandler from './errors/handler'

import cors from 'cors'

import routes from './routes'
import Dotenv from 'dotenv'
import AppError from './errors/AppError'
const dotenv = Dotenv

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')))
app.use(ErrorHandler)
app.use(
  (error: Error, request: Request, response: Response, _next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'client error',
        message: error.message,
      })
    }
    console.error(error)
    return response.status(500).json({
      status: 'code error',
      message: 'internal server error',
    })
  },
)
app.listen(3333, () => {
  console.log('🚀Server started on port 3333!')
})
