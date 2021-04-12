const Notification = ({notification}) => {
  if (!notification) return null
  if (!notification.message) return null

  const {message, isWarning=false} = notification

  const successStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 20,
    border: '2px solid green',
    backgroundColor: 'lightgray',
    borderRadius: '4px'
  }

  const warningStyle = {
    color: 'red',
    fontStyle: 'bold',
    fontSize: 20,
    border: '2px solid red',
    backgroundColor: 'lightgray',
    borderRadius: '4px'
  }

  const notificationStyle = (isWarning)
    ? warningStyle
    : successStyle


  return (
    <div className="error" style={notificationStyle} >
      {message}
    </div>
  )
}

export default Notification