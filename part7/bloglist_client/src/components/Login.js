import React from 'react'
import { logout } from '../reducers/loginReducer'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

const Login = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const history = useHistory()


  const handleLogout = () =>
    dispatch(logout())

  if (!user) return (
    <button onClick={() => history.push('/login')}>Login</button>
  )

  const style = { display: 'inline-block' }
  return (
    <div style={style}>
      <div style={style}>{user.name} logged in</div>
      <button style={style} onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Login