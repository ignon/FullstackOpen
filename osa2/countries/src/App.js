import React, { useEffect, useState } from 'react'
import axios from 'axios'


const App = (props) => {

  const [ filter, setFilter ] = useState('')
  const [ countryName,    setCountryName ] = useState('')
  const [ countries, setCountries] = useState([])

  const {WEATHER_API_KEY} = props
  console.log(WEATHER_API_KEY)


  const hook = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then((response) => {
        console.log(response.data)
        
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }
  useEffect(hook, [])

  const weather_hook = () => {
      const query = 'Helsinki'
      const access_key = WEATHER_API_KEY
      const weather_api_url =
      `http://api.weatherstack.com/current?access_key=${WEATHER_API_KEY}&query=${query}`
      axios.get(weather_api_url, null, { params: {
        access_key,
        query
      }})
      .then(response => {
        console.log(response.data)
      })
    }

  useEffect(weather_hook, [WEATHER_API_KEY, countryName])
  


  const handleNewFilter = (event) => {
    const newFilter = event.target.value
    setFilter(newFilter)
  }

  const handleNewCountryName = (countryName) => {
    console.log(countryName)
    setCountryName(countryName)
  }

  return (
    <div>
      <Filter
        filter={filter}
        handleNewFilter={handleNewFilter}
        setFilter={setFilter}
      />
      <Countries
        countries={countries}
        filter={filter}
        handleNewCountryName={handleNewCountryName}
      />
    </div>
  )

}


const Filter = ({filter, handleNewFilter}) => (
  <div>
    <p>filter shown with</p> <input
      value={filter}
      onChange={handleNewFilter}
    />
  </div>
)

const Countries = ({countries, filter, handleNewCountryName}) => {
  const filteredCountries =
    countries.filter(country => {
      const regexp = new RegExp('^'+filter, 'i')
      return (regexp.test(country.name))
    })
  
  const maxCountriesToShow = 10
  if (filteredCountries.length >= maxCountriesToShow)
    return (
      <div>
        <p>Too many matches, specify another filter</p>
      </div>
    )
  if (filteredCountries.length === 1) {

    const selectedCountry = filteredCountries[0]
    const {name, flag, languages, capital, population} = selectedCountry;
    handleNewCountryName(name)
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
                <button onClick={() => handleNewCountryName({...country})}>show</button>
            </li>
          )
        }
      </ul>
    </div>
  );
}



export default App



/*

import React, { useState } from 'react'

const App = (props) => {
  const [notes, setNotes] = useState(props.notes)
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true);

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  

  const addNote = (event) => {
      event.preventDefault()
      console.log('button clicked', event.target)
      
      const noteObj = {
        content: newNote,
        date: new Date().toISOString(),
        important: Math.random > 0.5,
        id: notes.length
      }

      setNotes(
        notes.concat(noteObj)
      )
      setNewNote('')
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value);
    setNewNote(event.target.value)
  }

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => 
          <Note key={note.id} note={note} />
        )}
      </ul>

      <form onSubmit={addNote}>
          <input value={newNote} onChange={handleNoteChange}/>
          <button type="submit">Save</button>
      </form>
    </div>
  )
}

const Note = ({note}) => (
  <li>{note.content}</li>
)

export default App 
*/