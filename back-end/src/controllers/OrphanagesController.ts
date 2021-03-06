import { getRepository } from 'typeorm'
import Orphanage from '../models/Orphanage'
import { Request, Response } from 'express'
import OrphanagesView from '../views/OrphanagesView'
import * as yup from 'yup'

export default {
  async index(request: Request, response: Response): Promise<Response> {
    const orphanagesRepository = getRepository(Orphanage)
    const orphanages = await orphanagesRepository.find({
      relations: ['images'],
    })

    const renderOrphanages = orphanages.filter(
      orphanage => orphanage.IsAproved === true,
    )

    return response
      .status(200)
      .json(OrphanagesView.renderMany(renderOrphanages))
  },

  async indexNotAproved(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const orphanagesRepository = getRepository(Orphanage)
    const orphanages = await orphanagesRepository.find({
      relations: ['images'],
    })

    const renderOrphanages = orphanages.filter(
      orphanage => orphanage.IsAproved !== true,
    )

    return response
      .status(200)
      .json(OrphanagesView.renderMany(renderOrphanages))
  },
  async AproveOrphanage(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const orphanagesRepository = getRepository(Orphanage)
    const { id } = request.params
    const orphanage = await orphanagesRepository.findOneOrFail(id, {
      relations: ['images'],
    })
    orphanage.IsAproved = true
    await orphanagesRepository.save(orphanage)

    return response.status(200).json(OrphanagesView.render(orphanage))
  },

  async UpdateOrphanage(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      whatsapp,
      open_on_weekends,
    } = request.body
    const orphanagesRepository = getRepository(Orphanage)
    const { id } = request.params
    const orphanage = await orphanagesRepository.findOneOrFail(id, {
      relations: ['images'],
    })

    orphanage.name = name
    orphanage.latitude = latitude
    orphanage.longitude = longitude
    orphanage.about = about
    orphanage.instructions = instructions
    orphanage.open_on_weekends = open_on_weekends
    orphanage.whatsapp = whatsapp
    orphanage.opening_hours = opening_hours
    await orphanagesRepository.save(orphanage)
    return response.status(200).json(OrphanagesView.render(orphanage))
  },

  async show(request: Request, response: Response): Promise<Response> {
    const orphanagesRepository = getRepository(Orphanage)
    const { id } = request.params
    const orphanage = await orphanagesRepository.findOneOrFail(id, {
      relations: ['images'],
    })
    return response.status(200).json(OrphanagesView.render(orphanage))
  },

  async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      whatsapp,
      open_on_weekends,
    } = request.body
    const orphanagesRepository = getRepository(Orphanage)

    const requestImages = request.files as Express.Multer.File[]

    const images = requestImages.map(image => {
      return { path: image.filename }
    })
    const data = {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      whatsapp,
      open_on_weekends: open_on_weekends === 'true',
      images,
    }

    const schema = yup.object().shape({
      name: yup.string().required(),
      latitude: yup.number().required(),
      longitude: yup.number().required(),
      about: yup.string().required().max(300),
      instructions: yup.string().required(),
      opening_hours: yup.string().required(),
      whatsapp: yup.number(),
      open_on_weekends: yup.boolean().required(),
      images: yup
        .array(
          yup.object().shape({
            path: yup.string().required(),
          }),
        )
        .required(),
    })

    await schema.validate(data, {
      abortEarly: false,
    })

    const orphanage = orphanagesRepository.create(data)
    await orphanagesRepository.save(orphanage)

    return response.status(201).json(orphanage)
  },

  async delete(request: Request, response: Response): Promise<Response> {
    const orphanagesRepository = getRepository(Orphanage)
    const { id } = request.params
    await orphanagesRepository.delete(id)
    return response.status(200).json({ message: 'Deleted' })
  },
}
