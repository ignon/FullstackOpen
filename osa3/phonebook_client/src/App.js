import React, { useEffect, useState } from 'react'
import personService from './services/persons'


const App = () => {
  const [ persons, setPersons] = useState([])
  const [ notification, setNotification] = useState({})

  const hook = () => {
    personService
      .getAll()
      .then((persons) => {
        console.log('promise fulfilled')
        setPersons(persons)
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
    console.log('jaaa')
    const duplicate = persons.find(p => p.name === newPerson.name)
    
    if (duplicate) {
      if (!window.confirm(`${newPerson.name} already exists, replace the old number with a new one?`)) return;

      personService
        .update(duplicate.id, newPerson)
        .then(returnedPerson => {
          showNotification(`Number of ${returnedPerson.name} updated!`)

          setPersons(
            persons.map(person => (person.id !== returnedPerson.id)
              ? person : returnedPerson
            )
          )
        })
        .catch(err => {
          const error = err.response.data.error
          showNotification(`Error: ${error}`, true)
        })
    }
    else {
      personService
        .add(newPerson)
        .then(returnedPerson => {
          showNotification(`${returnedPerson.name} added to phonebook!`)
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
        .catch(err => {
          const error = err.response.data.error
          showNotification(`Error: ${error}`, true)
        })
    }
  }

  const removePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(person.id)
        .then(() => {
          setPersons(
            persons.filter(p => p.id !== person.id)
          )
          showNotification(`${person.name} removed from phonebook!`)
        })
        .catch(error => {
          showNotification(`Information of ${person.name} has already been removed from the server`, true)
        })
    }
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

  const showNotification = (message, isWarning=false) => {
    setNotification({message, isWarning})

    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }


  return (
    <div>
      <Notification notification={notification}/>

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
        removePerson={removePerson}
      />
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

const Numbers = ({persons, filter, removePerson}) => (
  <div>
    <ul>
      {persons
        .filter(p => {
          const regexp = new RegExp('^'+filter, 'i')
          return (regexp.test(p.name))
        })
        .map(
          p => <li key={p.name}>{p.name} {p.number}<button onClick={() => removePerson(p)}>Delete</button></li>
        )
      }
    </ul>
  </div>
)
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

export default App
