import blogService from '../services/blogs'
import loginService from '../services/login'
import { showNotification } from './notificationReducer'

const reducer = (state = null, action) => {
  // console.log(action.type, action)
  switch(action.type) {
    case 'SET_USER': {
      const user = action.data
      return user
    }
    case 'LOGOUT': {
      const user = null
      return user
    }
    default:
      return state
  }
}

export const login = (username, password) => {
  return (dispatch) => {
    loginService
      .login({ username, password })
      .then((loggedUser) => {
        if (!loggedUser)
          throw new Error('unknown login error')

        dispatch({
          type: 'SET_USER',
          data: loggedUser
        })

        window.localStorage.setItem(
          'loggedUser',  JSON.stringify(loggedUser)
        )
        blogService.setToken(loggedUser.token)

        dispatch(
          showNotification(`Logged in as ${loggedUser.username}`)
        )
      })
      .catch(response => {
        dispatch(
          showNotification('Invalid username or password', true)
        )
      })
  }
}

export const logout = () => {
  return (dispatch) => {
    window.localStorage.removeItem('loggedUser')

    dispatch({
      type: 'LOGOUT'
    })
  }
}

export const silentLogin = () => {
  return (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      console.log('SILENT LOGIN', user)

      dispatch({
        type: 'SET_USER',
        data: user
      })
    }
  }
}

export default reducer