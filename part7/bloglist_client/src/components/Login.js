import React from 'react'
import { logout } from '../reducers/loginReducer'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

import { Link } from 'react-router-dom'
const Login = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const history = useHistory()


  const handleLogout = () =>
    dispatch(logout())

  // if (!user) return (
  // )

  // const style = { display: 'inline-block' }
  return (
    <Menu.Menu position='right'>
      {(user) &&
      <>
        <Menu.Item
          as={NavLink} to={`/user/${user.id}`}
        >
          {user.name} logged in
        </Menu.Item>
        <Menu.Item onClick={handleLogout}>Logout</Menu.Item>
      </>
      }
      {(!user) &&
        <Menu.Item
          as={NavLink} to='/login'
          activeClassName='active'
        >
        Login
        </Menu.Item>
      }
    </Menu.Menu>
  )
}

export default Login