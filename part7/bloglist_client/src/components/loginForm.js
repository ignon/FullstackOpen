import React, { useState }  from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/loginReducer'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }
  const getFields = () => ({
    type,
    value,
    onChange
  })

  return {
    reset,
    getFields,
    value
  }
}
const LoginForm = () => {
  const username = useField('text')
  const password = useField('text')
  const dispatch = useDispatch()

  const handleLogin = (event) => {
    event.preventDefault()
    dispatch(login(username.value, password.value))
    console.log(event)
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

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired
}

LoginForm.displayName = 'LoginForm'

export default LoginForm