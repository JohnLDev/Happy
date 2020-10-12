// eslint-disable-next-line no-use-before-define
import React from 'react'
import '../styles/pages/landing.css'
import Logo from '../images/Logo.svg'
import { FiArrowRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'

const Landing: React.FC = () => {
  return (
    <>
      <div id='page-landing'>
        <div className='content-wrapper'>
          <img src={Logo} alt='logo' />
          <main>
            <h1>Leve felicidade para o mundo</h1>
            <p>Visite orfanatos e mude o dia de muitas crianças.</p>
          </main>

          <div className='location'>
            <strong>Pelotas </strong>
            <span>Rio Grande do Sul</span>
          </div>

          <Link to='/orphanages' className='enter-app'>
            <FiArrowRight size={26} color='rgba(0,0,0,0.6)' />
          </Link>
        </div>
      </div>
    </>
  )
}

export default Landing
