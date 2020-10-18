import { Router } from 'express'
import multer from 'multer'
import ensureAuthenticated from '../middleware/ensureAuthenticate'
import UploadConfig from '../config/upload'
import OrphanagesController from '../controllers/OrphanagesController'

const orphanagesRouter = Router()
const upload = multer(UploadConfig)

orphanagesRouter.get('/', OrphanagesController.index)

orphanagesRouter.put(
  '/notaproved/:id',
  ensureAuthenticated,
  OrphanagesController.AproveOrphanage,
)

orphanagesRouter.put(
  '/editorphanage/:id',
  ensureAuthenticated,
  OrphanagesController.UpdateOrphanage,
)
orphanagesRouter.get(
  '/notaproved',
  ensureAuthenticated,
  OrphanagesController.indexNotAproved,
)

orphanagesRouter.get('/:id', OrphanagesController.show)

orphanagesRouter.post('/', upload.array('images'), OrphanagesController.create)

orphanagesRouter.delete(
  '/:id',
  ensureAuthenticated,
  OrphanagesController.delete,
)

export default orphanagesRouter
