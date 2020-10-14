import Orphanage from '../models/Orphanage'
import ImagesView from './ImagesView'

interface ResponseImage {
  id: number
  path: string
}
interface Response {
  id: number
  name: string
  latitude: number
  longitude: number
  about: string
  instructions: string
  opening_hours: string
  open_on_weekends: boolean
  images: ResponseImage[]
}
export default {
  render(orphanage: Orphanage): Response {
    return {
      id: orphanage.id,
      name: orphanage.name,
      latitude: orphanage.latitude,
      longitude: orphanage.longitude,
      about: orphanage.about,
      instructions: orphanage.instructions,
      opening_hours: orphanage.opening_hours,
      open_on_weekends: orphanage.open_on_weekends,
      images: ImagesView.renderMany(orphanage.images),
    }
  },
  renderMany(orphanages: Orphanage[]): Response[] {
    return orphanages.map(orphanage => this.render(orphanage))
  },
}
