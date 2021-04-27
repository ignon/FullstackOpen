import React, { useState }  from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/loginReducer'
import { useHistory } from 'react-router'
import { useField } from '../utils/utils.js'
import { Form, Input, Button } from 'semantic-ui-react'

const LoginForm = () => {
  const username = useField('text')
  const password = useField('password')
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
      <Form onSubmit={handleLogin}>
        <Form.Field>
          <label>Username</label>
          <Input
            id="usernameField"
            name="Username"
            {...username.getFields()}
          />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <Input
            id="passwordField"
            name="Password"
            {...password.getFields()}
          />
        </Form.Field>
        <Button id="loginButton" type="submit">Login</Button>
      </Form>
    </div>
  )
}

LoginForm.displayName = 'LoginForm'

export default LoginForm