// eslint-disable-next-line no-use-before-define
import React, { FormEvent, useState, ChangeEvent } from 'react'
import { Map, Marker, TileLayer } from 'react-leaflet'

import { FiPlus, FiX } from 'react-icons/fi'

import '../styles/pages/create-orphanage.css'
import { Sidebar } from '../components/Sidebar'
import happyMapIcon from '../utils/mapIcon'
import { LeafletMouseEvent } from 'leaflet'
import api from '../services/api'
import { useHistory } from 'react-router-dom'

const CreateOrphanage: React.FC = () => {
  const history = useHistory()
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 })
  const [name, setName] = useState('')
  const [about, setAbout] = useState('')
  const [instructions, setInstructions] = useState('')
  const [opening_hours, setOpeningHours] = useState('')
  const [whatsApp, setWhatsApp] = useState('')
  const [open_on_weekends, setOpenOnWeekends] = useState(true)
  const [images, setImages] = useState<File[]>([])
  const [previewImages, setPreviewImages] = useState<string[]>([])

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

    const selectedImagesPreview = selectedImages.map(image => {
      return URL.createObjectURL(image)
    })
    setPreviewImages([...previewImages, ...selectedImagesPreview])
  }

  function handleRemoveImage(image: File, index: number): void {
    const newImages = previewImages.slice(index - 1, 1)
    setPreviewImages(newImages)

    const finalImages = images.filter(img => img !== image)

    setImages(finalImages)
  }

  async function handleSubmit(event: FormEvent): Promise<void> {
    event.preventDefault()

    const { latitude, longitude } = position
    if (latitude === 0) {
      alert('Por favor selecione o orfanato no mapa')
      return
    }
    const data = new FormData()

    data.append('name', name)
    data.append('about', about)
    data.append('latitude', String(latitude))
    data.append('longitude', String(longitude))
    data.append('instructions', instructions)
    data.append('opening_hours', opening_hours)
    data.append('whatsapp', whatsApp)
    data.append('open_on_weekends', String(open_on_weekends))
    images.forEach(image => {
      data.append('images', image)
    })
    await api.post('/orphanages', data)

    history.push('/created')
  }

  return (
    <div id='page-create-orphanage'>
      <Sidebar admin={false} />
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
                {images.map((image, index) => {
                  return (
                    <div key={(image as unknown) as string}>
                      <img src={URL.createObjectURL(image)} alt={name}></img>
                      <button
                        className='removeButton'
                        onClick={() => {
                          handleRemoveImage(image, index)
                        }}
                      >
                        <FiX color='#FF669D' size={20} />
                      </button>
                    </div>
                  )
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
                style={{ border: instructions ? '1px solid #A1E9C5' : '0' }}
                id='instructions'
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
                style={{ border: whatsApp ? '1px solid #A1E9C5' : '0' }}
                id='whatsapp'
                value={whatsApp}
                onChange={({ target: { value } }) => setWhatsApp(value)}
                type='number'
                maxLength={11}
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
export default CreateOrphanage
