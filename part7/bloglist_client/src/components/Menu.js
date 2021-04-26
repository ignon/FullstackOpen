
import React from 'react'
import { Link } from 'react-router-dom'
import Login from './Login'
const Menu = () => {
  const menuStyle = {
    paddingRight: 5,
  }

  const containerStyle = {
    backgroundColor: 'lightgray'
  }

  return (
    <div style={containerStyle}>
      <Link to='/' style={menuStyle}>Blogs</Link>
      <Link to='/users' style={menuStyle}>Users</Link>
      <Login style={containerStyle} />
    </div>
  )
}

export default Menu