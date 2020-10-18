// eslint-disable-next-line no-use-before-define
import React from 'react'
import { useHistory } from 'react-router-dom'
import '../styles/pages/exclude-page.css'
import Exclude from '../images/Exclude.svg'

const ExcludePage: React.FC = () => {
  const history = useHistory()

  function goMap(): void {
    history.push('/orphanages')
  }

  return (
    <div id='exclude-page'>
      <div className='excludetext'>
        <h1>Excluido !</h1>
        <p>Você acabou de excluir o orfanato :(</p>
        <button onClick={goMap}>Voltar para o mapa</button>
      </div>
      <div className='sadgirl'>
        <img src={Exclude} alt='Menina triste' />
      </div>
    </div>
  )
}
export default ExcludePage
