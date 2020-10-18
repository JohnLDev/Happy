// eslint-disable-next-line no-use-before-define
import React, { useState, useEffect } from 'react'
import { Map, Marker, TileLayer } from 'react-leaflet'

import '../styles/pages/accept-or-remove-orphanage.css'
import { Sidebar } from '../components/Sidebar'
import happyMapIcon from '../utils/mapIcon'

import api from '../services/api'
import { useHistory, useParams } from 'react-router-dom'
import { FiCheck, FiXCircle } from 'react-icons/fi'

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

const AcceptOrRemoveOrphanage: React.FC = () => {
  const params = useParams<OrphanageParams>()
  const history = useHistory()

  const [previewImages, setPreviewImages] = useState<string[]>([])
  const [orphanage, setOrphanage] = useState<Orphanage>()

  useEffect(() => {
    api.get(`/orphanages/${params.id}`).then(response => {
      setOrphanage(response.data)
    })
  }, [params.id])

  useEffect(() => {
    if (orphanage) {
      setPreviewImages(orphanage.images.map(image => image.path))
    }
  }, [orphanage])

  async function handleAproveOrphanage(): Promise<void> {
    await api.put(`/orphanages/notaproved/${params.id}`)
    alert('Orfanato aprovado')
    history.push('/adminpage')
  }

  async function handleRemoveOrphanage(): Promise<void> {
    const confirmDelete = window.confirm(
      `Deseja realmente reprovar ${orphanage?.name}`,
    )
    if (!confirmDelete) {
      return
    }

    await api.delete(`/orphanages/${params.id}`)

    history.goBack()
  }

  return (
    <div id='page-create-orphanage'>
      <Sidebar admin={false} />
      <main>
        <form className='create-orphanage-form'>
          <fieldset>
            <legend>Dados</legend>

            {orphanage && (
              <Map
                center={[orphanage.latitude, orphanage.longitude]}
                style={{ width: '100%', height: 280 }}
                zoom={15}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                {/* <TileLayer
                // url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              /> */}
                <TileLayer url='https://a.tile.openstreetmap.org/{z}/{x}/{y}.png' />
                <Marker
                  interactive={false}
                  icon={happyMapIcon}
                  position={[orphanage.latitude, orphanage.longitude]}
                />
                )
              </Map>
            )}

            <div className='input-block'>
              <label htmlFor='name'>Nome</label>
              <input id='name' value={orphanage?.name} />
            </div>

            <div className='input-block'>
              <label htmlFor='about'>
                Sobre <span>Máximo de 300 caracteres</span>
              </label>
              <textarea id='name' maxLength={300} value={orphanage?.about} />
            </div>

            <div className='input-block'>
              <label htmlFor='images'>Fotos</label>

              <div className='images-container'>
                {previewImages.map(image => {
                  return (
                    <img key={image} src={image} alt='foto ilustrativa'></img>
                  )
                })}
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className='input-block'>
              <label htmlFor='instructions'>Instruções</label>
              <textarea id='instructions' value={orphanage?.instructions} />
            </div>

            <div className='input-block'>
              <label htmlFor='opening_hours'>Horário de funcionamento</label>
              <input id='opening_hours' value={orphanage?.opening_hours} />
            </div>

            <div className='input-block'>
              <label htmlFor='whatsapp'>WhatsApp</label>
              <input id='whatsapp' value={orphanage?.whatsapp} type='number' />
            </div>

            <div className='input-block'>
              <label htmlFor='open_on_weekends'>Atende fim de semana</label>

              <div className='button-select'>
                <button
                  type='button'
                  className={orphanage?.open_on_weekends ? 'active' : ''}
                >
                  Sim
                </button>
                <button
                  type='button'
                  className={orphanage?.open_on_weekends ? '' : 'active'}
                >
                  Não
                </button>
              </div>
            </div>
          </fieldset>

          <div className='handleorphanage'>
            <button className='remove-button' onClick={handleRemoveOrphanage}>
              <FiXCircle size={20} color='#ffff' /> {'  '} Reprovar
            </button>

            <button className='confirm-button' onClick={handleAproveOrphanage}>
              <FiCheck size={20} color='#ffff' /> {'  '} Aprovar
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}
export default AcceptOrRemoveOrphanage
