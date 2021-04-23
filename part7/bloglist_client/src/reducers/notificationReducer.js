/* eslint-disable indent */
const initialState = {
  message: 'init',
  isWarning: false
}

const reducer = (state = initialState, action) => {

  switch(action.type) {

    case 'SET_NOTIFICATION':
      return {
        ...state,
        message: action.data.message,
        isWarning: action.data.isWarning
      }

    case 'RESET_NOTIFICATION':
      return initialState

    default:
      return state
  }
}

let timeoutHandle = null
export const showNotification = (message, seconds=5, isWarning=false) => {
  return async (dispatch) => {
    clearTimeout(timeoutHandle)

    timeoutHandle = setTimeout(() => {
      dispatch({
        type: 'RESET_NOTIFICATION'
      })
    }, seconds * 1000)
    dispatch({
      type: 'SET_NOTIFICATION',
      data: { message, isWarning }
    })

  }
}


export default reducer