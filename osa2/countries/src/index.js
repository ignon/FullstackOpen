import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY
console.log(WEATHER_API_KEY)

ReactDOM.render(
  <App WEATHER_API_KEY={WEATHER_API_KEY}/>,
  document.getElementById('root')
)