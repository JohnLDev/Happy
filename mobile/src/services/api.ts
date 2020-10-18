import Axios from 'axios'

const api = Axios.create({
  baseURL: 'http://172.22.138.1:3333',
})

export default api
