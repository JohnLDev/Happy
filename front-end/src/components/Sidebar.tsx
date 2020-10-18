/* eslint-disable react/prop-types */
// eslint-disable-next-line no-use-before-define
import React, { useState } from 'react'
import mapMarkerImg from '../images/map-marker.svg'
import { FiArrowLeft, FiMapPin, FiAlertCircle } from 'react-icons/fi'
import '../styles/components/sidebar.css'
import { useHistory } from 'react-router-dom'

interface Props {
  admin: boolean
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const Sidebar: React.FC<Props> = props => {
  const { goBack } = useHistory()
  const [stage, setStage] = useState(true)
  return (
    <aside className='app-sidebar'>
      <img src={mapMarkerImg} alt='Happy' />

      {props.admin && (
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
      )}
      <footer>
        <button type='button' onClick={goBack}>
          <FiArrowLeft size={24} color='#FFF' />
        </button>
      </footer>
    </aside>
  )
}
