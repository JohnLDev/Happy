import Image from '../models/Image'

interface Response {
  id: number
  path: string
}
export default {
  render(image: Image): Response {
    return {
      id: image.id,
      path: `http://172.22.138.1:3333/uploads/${image.path}`,
    }
  },
  renderMany(images: Image[]): Response[] {
    return images.map(image => this.render(image))
  },
}
