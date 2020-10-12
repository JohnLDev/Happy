// eslint-disable-next-line no-use-before-define
import React from 'react'
import { Link } from 'react-router-dom'
import { FiPlus } from 'react-icons/fi'
import { Map, TileLayer } from 'react-leaflet'

import '../styles/pages/orphanages-map.css'
import 'leaflet/dist//leaflet.css'
import MapMarquerImg from '../images/map-marker.svg'

const OrphangesMap: React.FC = () => {
  return (
    <div id='page-map'>
      <aside>
        <header>
          <img src={MapMarquerImg} alt='Happy' />

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
      </Map>
      <Link to='' className='create-orphanage'>
        <FiPlus size={32} color='#fff' />
      </Link>
    </div>
  )
}

export default OrphangesMap
