
import React from 'react'
import { NavLink } from 'react-router-dom'
import Login from './Login'
import { Menu } from 'semantic-ui-react'


const MenuElement = () => {
  return (
    <Menu>
      <Menu.Item as={NavLink} exact to='/' activeClassName='active'>Blogs</Menu.Item>
      <Menu.Item as={NavLink} to='/users' activeClassName='active'>Users</Menu.Item>
      <Login />
    </Menu>
  )
}

export default MenuElement