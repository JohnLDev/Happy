// eslint-disable-next-line no-use-before-define
import React from 'react'
import { useHistory } from 'react-router-dom'
import '../styles/pages/created-page.css'
import Created from '../images/Created.svg'

const ExcludePage: React.FC = () => {
  const history = useHistory()

  function goMap(): void {
    history.push('/orphanages')
  }

  return (
    <div id='created-page'>
      <div className='createdtext'>
        <h1>Ebaaa !</h1>
        <p>
          O cadastro deu certo e foi enviado ao administrador para ser aprovado.
          Agora é só esperar :)
        </p>
        <button onClick={goMap}>Voltar para o mapa</button>
      </div>
      <div className='happygirl'>
        <img src={Created} alt='Menina feliz' />
      </div>
    </div>
  )
}
export default ExcludePage
