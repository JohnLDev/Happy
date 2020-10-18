// eslint-disable-next-line no-use-before-define
import React, { FormEvent, useState } from 'react'
import '../styles/pages/forgotpassword.css'
import Logotipo from '../images/Logotipo.svg'
import { FiArrowLeft } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import api from '../services/api'

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('')
  async function handleRecovery(e: FormEvent): Promise<void> {
    e.preventDefault()
    try {
      api.post('/users/passwordrecovery', { email })
      alert('Foi enviada uma nova senha para seu email')
    } catch (error) {
      alert('por favor insira um email valido')
    }
  }
  return (
    <>
      <div id='page'>
        <div id='page-login'>
          <div className='content-wrapper'>
            <img src={Logotipo} alt='logo' />
            <div className='locatio'>
              <strong>Pelotas </strong>
              <span>Rio Grande do Sul</span>
            </div>
          </div>
        </div>
        <div className='login'>
          <div className='header'>
            <Link to='/loginpage'>
              <FiArrowLeft color='#15C3D6' size={30} />
            </Link>
          </div>

          <div className='input'>
            <form action='submit' onSubmit={handleRecovery}>
              <strong>Esqueci a senha</strong>
              <div className='quebradelinha'>
                <p>Sua redefinição será enviada para o email cadastrado</p>
              </div>

              <div className='input-block'>
                <label htmlFor='email'>E-mail</label>
                <input
                  required
                  id='email'
                  value={email}
                  onChange={({ target: { value } }) => setEmail(value)}
                />
              </div>

              <button type='submit'>Enviar</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default ForgotPassword
