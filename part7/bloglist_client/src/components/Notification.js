import React from 'react'
import { useSelector } from 'react-redux'
import { Message } from 'semantic-ui-react'
const Notification = () => {
  const notification = useSelector(state => state.notification)

  if (!notification) return null
  if (!notification.message) return null

  const { message, isWarning=false } = notification

  // const successStyle = {
  //   color: 'green',
  //   fontStyle: 'italic',
  //   fontSize: 20,
  //   border: '2px solid green',
  //   backgroundColor: 'lightgray',
  //   borderRadius: '4px'
  // }

  // const warningStyle = {
  //   color: 'red',
  //   fontStyle: 'bold',
  //   fontSize: 20,
  //   border: '2px solid red',
  //   backgroundColor: 'lightgray',
  //   borderRadius: '4px'
  // }

  const color = (isWarning)
    ? 'red' : 'green'


  return (
    <Message color={color} className="error"> {message} </Message>
  )
}

Notification.displayName = 'Notification'

export default Notification