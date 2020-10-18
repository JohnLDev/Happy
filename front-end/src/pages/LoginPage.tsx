// eslint-disable-next-line no-use-before-define
import React, { useState, FormEvent, useEffect } from 'react'
import '../styles/pages/loginpage.css'
import Logotipo from '../images/Logotipo.svg'
import { FiArrowLeft } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom'
import { dontRemenber, login, remenber } from '../services/auth'
import api from '../services/api'

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isChecked, setIsChecked] = useState(false)
  const history = useHistory()

  useEffect(() => {
    const EmailStorage = localStorage.getItem('email@email.com')
    const PasswordStorage = localStorage.getItem('password')
    if (EmailStorage !== null && PasswordStorage !== null) {
      setEmail(EmailStorage)
      setPassword(PasswordStorage)
      setIsChecked(true)
    }
  }, [])

  async function handleLogin(e: FormEvent): Promise<void> {
    e.preventDefault()

    try {
      const response = await api.post('users/login', { email, password })
      login(response.data.token)
      if (isChecked) {
        remenber(email, password)
      } else {
        dontRemenber()
      }
      history.push('/adminpage')
    } catch (err) {
      alert('Falha no login, tente novamente.')
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
            <Link to='/'>
              <FiArrowLeft color='#15C3D6' size={30} />
            </Link>
          </div>

          <div className='inputs'>
            <form onSubmit={handleLogin} action='submit'>
              <div className='input-block'>
                <strong>Fazer login</strong>
                <label htmlFor='email'>E-mail</label>
                <input
                  required
                  id='email'
                  value={email}
                  onChange={({ target: { value } }) => setEmail(value)}
                />
              </div>
              <div className='input-block'>
                <label htmlFor='password'>Senha</label>
                <input
                  required
                  id='password'
                  value={password}
                  onChange={({ target: { value } }) => setPassword(value)}
                />
              </div>
              <div className='checkbox'>
                <input
                  type='checkbox'
                  name='forgot'
                  id='forgot'
                  defaultChecked={isChecked}
                  onChange={({ target: { checked } }) => setIsChecked(checked)}
                  checked={isChecked}
                />
                <div className='recovery'>
                  <label htmlFor='forgot'>Lembrar-me</label>
                </div>
                <Link to='/forgotpassword'>Esqueci minha senha</Link>
              </div>
              <button type='submit'>Entrar</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginPage
