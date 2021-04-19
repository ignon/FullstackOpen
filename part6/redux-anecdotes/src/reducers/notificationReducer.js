// import store from '../store'

const initialState = {
  message: 'Initial state (:'
}

const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', JSON.stringify(action))
  console.log('action data', action.data)

  switch(action.type) {
    case 'SET_NOTIFICATION':
      return {
        ...state,
        message: action.data.message
      }
    case 'RESET_NOTIFICATION':
      return initialState
    default:
      return state
  }
}

export const setNotification = (message) => ({
  type: 'SET_NOTIFICATION',
  data: { message }
})

export const resetNotification = () => ({
  type: 'RESET_NOTIFICATION'
})

// setTimeout(() => {
//   store.dispatch(resetNotification())
// }, 5000)

export default reducer