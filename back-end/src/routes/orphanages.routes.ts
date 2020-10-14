import { Router } from 'express'
import multer from 'multer'

import UploadConfig from '../config/upload'
import OrphanagesController from '../controllers/OrphanagesController'

const orphanagesRouter = Router()
const upload = multer(UploadConfig)

orphanagesRouter.get('/', OrphanagesController.index)

orphanagesRouter.get('/:id', OrphanagesController.show)

orphanagesRouter.post('/', upload.array('images'), OrphanagesController.create)

export default orphanagesRouter
