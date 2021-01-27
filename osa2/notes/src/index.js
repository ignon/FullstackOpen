import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

const notes = [
  {
    id: 0,
    content: 'juu',
    important: true
  },
  {
    id: 1,
    content: 'jaa',
    important: false
  }
]

ReactDOM.render(
  <App notes={notes} />,
  document.getElementById('root')
)