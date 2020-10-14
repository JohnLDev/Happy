import express from 'express'
import 'reflect-metadata'
import 'express-async-errors'
import './database'
import path from 'path'
import ErrorHandler from './errors/handler'
import cors from 'cors'

import routes from './routes'
import Dotenv from 'dotenv'
const dotenv = Dotenv

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')))
app.use(ErrorHandler)
app.listen(3333, () => {
  console.log('🚀Server started on port 3333!')
})
