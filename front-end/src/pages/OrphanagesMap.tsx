// eslint-disable-next-line no-use-before-define
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiPlus, FiArrowRight } from 'react-icons/fi'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import api from '../services/api'
import '../styles/pages/orphanages-map.css'
import MapMarkerImg from '../images/map-marker.svg'
import happyMapIcon from '../utils/mapIcon'

interface Orphanage {
  id: number
  latitude: number
  longitude: number
  name: string
}

const OrphangesMap: React.FC = () => {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([])

  useEffect(() => {
    api.get('/orphanages').then(response => {
      setOrphanages(response.data)
    })
  }, [])
  return (
    <div id='page-map'>
      <aside>
        <header>
          <img src={MapMarkerImg} alt='Happy' />

          <h2>Escolha um orfanto no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </header>
        <footer>
          <strong>Pelotas </strong>
          <span>Rio Grande do Sul</span>
        </footer>
      </aside>
      <Map
        center={[-31.7574627, -52.3719938]}
        zoom={15}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer url='https://a.tile.openstreetmap.org/{z}/{x}/{y}.png' />
        {orphanages.map(orphanage => {
          return (
            <Marker
              key={orphanage.id}
              position={[orphanage.latitude, orphanage.longitude]}
              icon={happyMapIcon}
            >
              <Popup
                closeButton={false}
                minWidth={240}
                maxWidth={240}
                className='map-popup'
              >
                {orphanage.name}
                <Link to={`/orphanages/${orphanage.id}`}>
                  <FiArrowRight size={20} color='#fff' />
                </Link>
              </Popup>
            </Marker>
          )
        })}
      </Map>
      <Link to='/orphanages/create' className='create-orphanage'>
        <FiPlus size={32} color='#fff' />
      </Link>
    </div>
  )
}

export default OrphangesMap
