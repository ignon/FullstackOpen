import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      ...
    </div>
  )

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