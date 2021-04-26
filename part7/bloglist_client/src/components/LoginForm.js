import React, { useState }  from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/loginReducer'
import { useHistory } from 'react-router'
import { useField } from '../utils/utils.js'

const LoginForm = () => {
  const username = useField('text')
  const password = useField('text')
  const history = useHistory()
  const dispatch = useDispatch()

  const handleLogin = (event) => {
    event.preventDefault()
    dispatch(login(username.value, password.value))
      .then(() => history.push('/'))
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          Username
          <input
            id="usernameField"
            name="Username"
            {...username.getFields()}
          />
        </div>
        <div>
          Password
          <input
            id="passwordField"
            name="Password"
            {...password.getFields()}
          />
        </div>
        <button id="loginButton" type="submit">Login</button>
      </form>
    </div>
  )
}

LoginForm.displayName = 'LoginForm'

export default LoginForm