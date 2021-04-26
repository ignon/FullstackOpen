import userService from '../services/users'
import { showNotification } from './notificationReducer'


const reducer = (state = [], action) => {
  switch(action.type) {
    case 'SET_USERS': {
      const users = action.data
      return users
    }

    default: {
      return state
    }
  }
}

export const getUsers = () => {
  return (dispatch) => {
    userService
      .getAll()
      .then(users => {
        console.log(users)
        dispatch({
          type: 'SET_USERS',
          data: users
        })
      })
      .catch(exception => {
        dispatch(
          showNotification(`Loading users failed: ${exception.error}`)
        )
      })
  }
}

export default reducer