import React, { useEffect } from 'react'
import Togglable from './togglable'
import LoginForm from './loginForm'
import { login, logout, silentLogin } from '../reducers/loginReducer'
import { useDispatch, useSelector } from 'react-redux'

const Login = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(silentLogin())
  }, [])

  const handleLogin = (username, password) =>
    dispatch(login(username, password))

  const handleLogout = () =>
    dispatch(logout())

  const logoutButton = () => (
    <div>
      <div>{user.name} logged in</div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )

  const loginForm = () => (
    <Togglable buttonLabel='Login'>
      <LoginForm handleLogin={handleLogin} />
    </Togglable>
  )

  return (
    <div>
      { (user === null) && loginForm() }
      { (user !== null) && logoutButton() }
    </div>
  )
}

export default Login