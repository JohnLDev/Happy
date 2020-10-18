// eslint-disable-next-line no-use-before-define
import React, { FormEvent, useState, ChangeEvent, useEffect } from 'react'
import { Map, Marker, TileLayer } from 'react-leaflet'

import { FiPlus } from 'react-icons/fi'

import '../styles/pages/create-orphanage.css'
import { Sidebar } from '../components/Sidebar'
import happyMapIcon from '../utils/mapIcon'
import { LeafletMouseEvent } from 'leaflet'
import api from '../services/api'
import { useHistory, useParams } from 'react-router-dom'

interface OrphanageParams {
  id: string
}

interface Orphanage {
  latitude: number
  longitude: number
  name: string
  about: string
  instructions: string
  opening_hours: string
  whatsapp: number
  open_on_weekends: boolean
  images: Array<{
    path: string
    id: number
  }>
}

const EditOrphanage: React.FC = () => {
  const params = useParams<OrphanageParams>()
  const history = useHistory()
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 })
  const [name, setName] = useState('')
  const [about, setAbout] = useState('')
  const [instructions, setInstructions] = useState('')
  const [opening_hours, setOpeningHours] = useState('')
  const [whatsapp, setWhatsApp] = useState('')
  const [open_on_weekends, setOpenOnWeekends] = useState(true)
  const [images, setImages] = useState<File[]>([])
  const [previewImages, setPreviewImages] = useState<string[]>([])
  const [orphanage, setOrphanage] = useState<Orphanage>()

  useEffect(() => {
    api.get(`/orphanages/${params.id}`).then(response => {
      setOrphanage(response.data)
    })
  }, [params.id])
  useEffect(() => {
    if (orphanage) {
      setName(orphanage.name)
      setAbout(orphanage.about)
      setInstructions(orphanage.instructions)
      setPreviewImages(orphanage.images.map(image => image.path))
      setImages((orphanage.images as unknown) as File[])
      setWhatsApp(String(orphanage.whatsapp))
      setOpenOnWeekends(orphanage.open_on_weekends)
      setOpeningHours(orphanage.opening_hours)
      setPosition({
        latitude: orphanage.latitude,
        longitude: orphanage.longitude,
      })
    }
  }, [orphanage])
  function handleMapClick(event: LeafletMouseEvent): void {
    const { lat, lng } = event.latlng
    setPosition({ latitude: lat, longitude: lng })
  }

  function handleSelectImages(event: ChangeEvent<HTMLInputElement>): void {
    if (!event.target.files) {
      return
    }
    const selectedImages = Array.from(event.target.files)
    setImages(selectedImages)
    setImages(images)
    const selectedImagesPreview = selectedImages.map(image => {
      return URL.createObjectURL(image)
    })
    setPreviewImages([...previewImages, ...selectedImagesPreview])
  }

  // function handleRemoveImage(image: string): void {
  //   const newImages = previewImages.filter(img => img === image)
  //   setPreviewImages(newImages)
  // }

  async function handleSubmit(event: FormEvent): Promise<void> {
    event.preventDefault()

    const { latitude, longitude } = position

    const data = {
      name,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
      whatsapp,
      latitude,
      longitude,
    }

    await api.put(`/orphanages/editorphanage/${params.id}`, data)
    alert('Cadastro atualizado com sucesso')

    history.push('/adminpage')
  }

  return (
    <div id='page-create-orphanage'>
      <Sidebar admin={true} />
      <main>
        <form onSubmit={handleSubmit} className='create-orphanage-form'>
          <fieldset>
            <legend>Dados</legend>

            <Map
              center={[-31.7574627, -52.3719938]}
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onClick={handleMapClick}
            >
              {/* <TileLayer
                // url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              /> */}
              <TileLayer url='https://a.tile.openstreetmap.org/{z}/{x}/{y}.png' />

              {position.latitude !== 0 && (
                <Marker
                  interactive={false}
                  icon={happyMapIcon}
                  position={[position.latitude, position.longitude]}
                />
              )}
            </Map>

            <div className='input-block'>
              <label htmlFor='name'>Nome</label>
              <input
                style={{ border: name ? '1px solid #A1E9C5' : '0' }}
                id='name'
                value={name}
                onChange={({ target: { value } }) => setName(value)}
              />
            </div>

            <div className='input-block'>
              <label htmlFor='about'>
                Sobre <span>Máximo de 300 caracteres</span>
              </label>
              <textarea
                style={{ border: about ? '1px solid #A1E9C5' : '0' }}
                id='name'
                maxLength={300}
                value={about}
                onChange={({ target: { value } }) => setAbout(value)}
              />
            </div>

            <div className='input-block'>
              <label htmlFor='images'>Fotos</label>

              <div className='images-container'>
                {previewImages.map(image => {
                  return <img key={image} src={image} alt={name}></img>
                })}
                <label htmlFor='image[]' className='new-image'>
                  <FiPlus size={24} color='#15b6d6' />
                </label>
              </div>
              <input
                type='file'
                multiple
                onChange={handleSelectImages}
                id='image[]'
              />
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className='input-block'>
              <label htmlFor='instructions'>Instruções</label>
              <textarea
                id='instructions'
                style={{ border: instructions ? '1px solid #A1E9C5' : '0' }}
                value={instructions}
                onChange={({ target: { value } }) => setInstructions(value)}
              />
            </div>

            <div className='input-block'>
              <label htmlFor='opening_hours'>Horário de funcionamento</label>
              <input
                style={{ border: opening_hours ? '1px solid #A1E9C5' : '0' }}
                id='opening_hours'
                value={opening_hours}
                onChange={({ target: { value } }) => setOpeningHours(value)}
              />
            </div>

            <div className='input-block'>
              <label htmlFor='whatsapp'>WhatsApp</label>
              <input
                style={{ border: whatsapp ? '1px solid #A1E9C5' : '0' }}
                id='whatsapp'
                value={whatsapp}
                onChange={({ target: { value } }) => setWhatsApp(value)}
                type='number'
              />
            </div>

            <div className='input-block'>
              <label htmlFor='open_on_weekends'>Atende fim de semana</label>

              <div className='button-select'>
                <button
                  type='button'
                  className={open_on_weekends ? 'active' : ''}
                  onClick={() => setOpenOnWeekends(true)}
                >
                  Sim
                </button>
                <button
                  type='button'
                  className={open_on_weekends ? '' : 'active'}
                  onClick={() => setOpenOnWeekends(false)}
                >
                  Não
                </button>
              </div>
            </div>
          </fieldset>

          <button className='confirm-button' type='submit'>
            Confirmar
          </button>
        </form>
      </main>
    </div>
  )
}
export default EditOrphanage
