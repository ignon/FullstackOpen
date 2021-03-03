import React, { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true);


  const hook = () => {
    console.log('effect')

    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        console.log('promise fulfilled')
        setNotes(response.data)
      })
  }

  useEffect(hook, [])



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