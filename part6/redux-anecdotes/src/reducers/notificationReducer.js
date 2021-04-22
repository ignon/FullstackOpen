// import store from '../store'

const initialState = {
  message: ''
}

const reducer = (state = initialState, action) => {
  // console.log('state now: ', state)
  // console.log('action', JSON.stringify(action))
  // console.log('action data', action.data)

  switch(action.type) {
    case 'SET_NOTIFICATION':
      return {
        ...state,
        message: action.data.message,
        handle: action.data.handle
      }

    case 'RESET_NOTIFICATION':
      return initialState
    default:
      return state
  }
}

let timeoutHandle = null
export const setNotification = (message, seconds=5) => {
  return async dispatch => {
    clearTimeout(timeoutHandle)

    timeoutHandle = setTimeout(() => {
      dispatch({
        type: 'RESET_NOTIFICATION'
      })
    }, seconds * 1000)
    dispatch({
      type: 'SET_NOTIFICATION',
      data: { message }
    })

  }
}

export default reducer