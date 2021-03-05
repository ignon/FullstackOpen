import React, { useEffect, useState } from 'react'
import axios from 'axios'


const App = (props) => {

  // Using country JSON map as a hook didn't feel wise because it had nested data structures (same with filteredCountries)
  const [ countryName,    setCountryName ] = useState('')
  const [ weatherData, setWeatherData] = useState({})
  const [ countries, setCountries] = useState([])
  const [ filter, setFilter ] = useState('')


  const {WEATHER_API_KEY} = props
  console.log('WEATHER_API_KEY', WEATHER_API_KEY)

  const filteredCountries =
    countries.filter(country => {
      const regexp = new RegExp('^'+filter, 'i')
      return (regexp.test(country.name))
    })

  if (filteredCountries.length === 1)
  {
    const country = filteredCountries[0];
    const name = country.name
    
    if (name !== countryName) {
      setCountryName(name)
      setWeatherData(undefined)
    }

    console.log(countryName)
  }

  const country = countries.find(country =>
    country.name === countryName
  )

  const restCountriesHook = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response =>
        setCountries(response.data)
      )
  }
  useEffect(restCountriesHook, [])


  const weatherHook = () => {
    console.log('WEATHER HOOK')

    if (!country || !country.name) return;

    const query = country.capital
    const access_key = WEATHER_API_KEY
    const weather_api_url =
      `http://api.weatherstack.com/current?access_key=${WEATHER_API_KEY}&query=${query}`
    axios.get(weather_api_url, null, { params: {
      access_key,
      query
    }})
    .then(response => {
      const newWeatherData = response.data
      console.log(newWeatherData.current)
      setWeatherData(response.data)
    })
  }
  useEffect(weatherHook, [WEATHER_API_KEY, country])


  const handleNewFilter = (event) => {
    const newFilter = event.target.value
    console.log('setFilter', newFilter)
    setFilter(newFilter)
  }
  
  return (
    <div>
      <Filter
        filter={filter}
        handleNewFilter={handleNewFilter}
      />
      <Countries
        filteredCountries={filteredCountries}
        setFilter={setFilter}
        weatherData={weatherData}
      />
    </div>
  )
}

const Weather = ({weatherData}) => {
  
  if (!weatherData || !weatherData.current || !weatherData.location)
    return (
      <div></div>
    );

  const weather = weatherData.current
  const city = weatherData.location.name
  
  return (
    <div>
      <h3>Weather in {city}</h3>
      <p><b>Temperature:</b> {weather.temperature} Celcius</p>
      <p><b>Wind:</b> {weather.temperature} mph direction {weather.wind_dir}</p>
    </div>
  )
}


const Filter = ({filter, handleNewFilter}) => (
  <div>
    <p>Find countries:</p>
    <input
      value={filter}
      onChange={handleNewFilter}
    />
  </div>
)

const Countries = ({filteredCountries, setCountryName, setFilter, weatherData}) => {

  const maxCountriesToShow = 10
  if (filteredCountries.length >= maxCountriesToShow)
    return (
      <div>
        <p>Too many matches, specify another filter</p>
      </div>
    )
  if (filteredCountries.length === 1) {

    const selectedCountry = filteredCountries[0]
    const {name, flag, languages, capital, population} = selectedCountry
    console.log(flag);
    
    return (
      <div>
        <h2>{name}</h2>
        <img src={flag} width="300" alt="Country flag"/>
        <p>Capital: {capital}</p>
        <p>Population: {population}</p>
        <h3>Languages</h3>
        <ul>
          {languages.map(lang =>
            <li key={lang.iso639_2}> {lang.name}</li>
          )}
        </ul>

        <Weather
          weatherData={weatherData}
        />
      </div>
    )
  }

  return (
    <div>
      <ul>
        {filteredCountries
          .map(country =>
            <li key={country.alpha3Code}>
              {country.name + ' '}
                <button onClick={() => setFilter(country.name)}>show</button>
            </li>
          )
        }
      </ul>
    </div>
  );
}


export default App