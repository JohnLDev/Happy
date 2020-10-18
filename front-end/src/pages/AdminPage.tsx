// eslint-disable-next-line no-use-before-define
import React, { useEffect, useState } from 'react'

import { Map, Marker, TileLayer } from 'react-leaflet'
import {
  FiAlertCircle,
  FiArrowLeft,
  FiArrowRight,
  FiEdit3,
  FiMapPin,
  FiTrash,
} from 'react-icons/fi'

import api from '../services/api'
import '../styles/pages/admin-page.css'
import happyMapIcon from '../utils/mapIcon'
import mapMarkerImg from '../images/map-marker.svg'
import { Link, useHistory } from 'react-router-dom'

interface Orphanage {
  id: number
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

const AdminPage: React.FC = () => {
  const { goBack, push } = useHistory()
  const [stage, setStage] = useState(true)
  const [orphanages, setOrphanage] = useState<Orphanage[]>([])
  const [orphanagesNotAproved, setOrphanageNotAproved] = useState<Orphanage[]>(
    [],
  )

  useEffect(() => {
    api.get(`/orphanages`).then(response => {
      setOrphanage(response.data)
    })
    api.get(`/orphanages/notaproved`).then(response => {
      setOrphanageNotAproved(response.data)
    })
  }, [])
  async function ensureAutenticate(): Promise<void> {
    try {
      await api.post('/users')
    } catch (error) {
      push('/loginpage')
      alert('Por favor realize login novamente seu login expirou')
    }
  }
  useEffect(() => {
    ensureAutenticate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function handleDeleteOrphanage(
    id: number,
    name: string,
  ): Promise<void> {
    const confirmDelete = window.confirm(`Deseja realmente deletar ${name}`)
    if (!confirmDelete) {
      return
    }

    await api.delete(`/orphanages/${id}`)
    const removedOrphanage = orphanages.filter(orphanage => orphanage.id !== id)
    setOrphanage(removedOrphanage)
    push('/excluded')
  }

  return (
    <>
      <div id='admin-landing'>
        <div className='sidebar'>
          <aside className='app-sidebar'>
            <img src={mapMarkerImg} alt='Happy' />

            <div className='admin-options'>
              <button
                type='button'
                id={stage ? 'active' : ''}
                onClick={() => setStage(true)}
              >
                <FiMapPin color={stage ? '#0089A5' : '#fff'} size={24} />
              </button>
              <button
                type='button'
                id={stage ? '' : 'active'}
                onClick={() => setStage(false)}
              >
                <FiAlertCircle color={stage ? '#fff' : '#0089A5'} size={24} />
              </button>
            </div>

            <footer>
              <button type='button' onClick={goBack}>
                <FiArrowLeft size={24} color='#FFF' />
              </button>
            </footer>
          </aside>
        </div>
        <div className='page'>
          <div className='header-content'>
            <header className='header'>
              <h1>{stage ? 'Orfanatos cadastrados' : 'Orfanatos pendentes'}</h1>
              <span>
                {stage ? orphanages.length : orphanagesNotAproved.length}{' '}
                orfanatos
              </span>
            </header>
            <div className='line'></div>
          </div>
          {stage ? (
            <div className='maps'>
              {orphanages.map(orphanage => {
                return (
                  <div className='container-map' key={orphanage.id}>
                    <Map
                      className='map'
                      center={[orphanage.latitude, orphanage.longitude]}
                      zoom={16}
                      dragging={false}
                      touchZoom={false}
                      zoomControl={false}
                      scrollWheelZoom={false}
                      doubleClickZoom={false}
                    >
                      {/* <TileLayer
                        url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                      /> */}
                      <TileLayer url='https://a.tile.openstreetmap.org/{z}/{x}/{y}.png' />
                      <Marker
                        interactive={false}
                        icon={happyMapIcon}
                        position={[orphanage.latitude, orphanage.longitude]}
                      />
                    </Map>
                    <div className='info'>
                      <h2>{orphanage.name}</h2>
                      <div className='admin-options'>
                        <Link to={`/orphanageeditor/${orphanage.id}`}>
                          <FiEdit3 size={20} color='#15C3D6' />
                        </Link>
                        <button
                          onClick={() =>
                            handleDeleteOrphanage(orphanage.id, orphanage.name)
                          }
                        >
                          <FiTrash size={20} color='#15C3D6' />
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className='maps'>
              {orphanagesNotAproved.map(orphanage => {
                return (
                  <div className='container-map' key={orphanage.id}>
                    <Map
                      className='map'
                      center={[orphanage.latitude, orphanage.longitude]}
                      zoom={16}
                      dragging={false}
                      touchZoom={false}
                      zoomControl={false}
                      scrollWheelZoom={false}
                      doubleClickZoom={false}
                    >
                      {/* <TileLayer
                    url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                  /> */}
                      <TileLayer url='https://a.tile.openstreetmap.org/{z}/{x}/{y}.png' />
                      <Marker
                        interactive={false}
                        icon={happyMapIcon}
                        position={[orphanage.latitude, orphanage.longitude]}
                      />
                    </Map>
                    <div className='info'>
                      <h2>{orphanage.name}</h2>
                      <div className='admin-options'>
                        <Link to={`/handleorphanage/${orphanage.id}`}>
                          <FiArrowRight size={20} color='#15C3D6' />
                        </Link>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default AdminPage
