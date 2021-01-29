import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import axios from 'axios'

const promise = axios.get(
  'http://localhost:3001/notes'
)

promise.then(response => {
  console.log(JSON.stringify(response, null, '\t'))
  console.log(response.data)
})

const promise2 = axios.get(
  'http://localhost:3001/foo'
)
console.log(promise2);



/*
ReactDOM.render(
  <App />,
  document.getElementById('root')
)
*/