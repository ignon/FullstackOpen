import React, { useEffect, useState } from 'react'
import axios from 'axios'


const App = () => {
  const [ persons, setPersons] = useState([
    //{ name: 'Arto Hellas', number:'12-34-56789'}
  ])

  const hook = () => {
    axios
      .get('http://localhost:3001/persons')
      .then((response) => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }
  useEffect(hook, [])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    console.log(event)

    if (newName.length <= 0) {
      alert('"Name" field is required!')
      return;
    }
    
    if (persons.find(p => p.name === newName)) {
      alert(`"${newName}" is already added to phonebook!`)
      return;
    }

    if (newNumber.length <= 0) {
      alert('"Number" field is required!')
      return;
    }

    if (!/^[0-9+-]*$/.test(newNumber)) {
      alert('Invalid phone number!')
      return;
    }


    const newPerson = {
      name: newName,
      number: newNumber
    }

    setPersons(
      persons.concat(newPerson)
    )
    setNewName('')
    setNewNumber('')
  }


  const handleNewFilter = (event) => {
    const filter = event.target.value
    setFilter(filter)
  }

  const handleNewName = (event) => {
    const name = event.target.value
    setNewName(name)
  }
  const handleNewNumber = (event) => {
    const number = event.target.value
    setNewNumber(number)
  }


  return (

    <div>
      <h2>Phonebook</h2>

      <Filter
        filter={filter}
        handleNewFilter={handleNewFilter}
      />

      <h3>Add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNewName={handleNewName}
        handleNewNumber={handleNewNumber}
      />

      <h3>Numbers</h3>
      <Numbers
        persons={persons}
        filter={filter}
      />
      {/*<div>newName: {newName}</div>*/}
    </div>
  )

}


const Filter = ({filter, handleNewFilter}) => (
  <div>
    filter shown with <input
      value={filter}
      onChange={handleNewFilter}
    />
  </div>
)

/* Omaan päähän ois tuntunut paljon fiksummalta siirtää name ja number -hookit tän sisään, mutta tien nyt ohjeen mukaan*/
const PersonForm = ({addPerson, newName, handleNewName, newNumber, handleNewNumber}) => (
  
  <form onSubmit={addPerson}>
    <div>name: <input
          value={newName}
          onChange={handleNewName}
        />
    </div>
    <div>
        number: <input
          value={newNumber}
          onChange={handleNewNumber}
        />
    </div>
    <div>
        <button type="submit">add</button>
    </div>
  </form>
)

const Numbers = ({persons, filter}) => (
  <div>
    <ul>
      {persons
        .filter(p => {
          const regexp = new RegExp('^'+filter, 'i')
          return (regexp.test(p.name))
        })
        .map(
          p => <li key={p.name}>{p.name} {p.number}</li>
        )
      }
    </ul>
  </div>
)
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