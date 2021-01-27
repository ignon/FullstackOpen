import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

const notes = [
  {
    id: 0,
    contents: 'lol'
  }
]

ReactDOM.render(
  <App notes={notes} />,
  document.getElementById('root')
)