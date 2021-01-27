import React, { useState } from 'react'

const App = (props) => {
  const [notes, setNotes] = useState(props.notes)
  
  const addNote = (event) => {
      event.preventDefault()
      console.log('button clicked', event.target)
  }

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note => 
          <Note key={note.id} note={note} />
        )}
      </ul>

      <form onSubmit={addNote}>
          <input />
          <button type="submit">Save</button>
      </form>
    </div>
  )
}

const Note = ({note}) => (
  <li>{note.contents}</li>
)

export default App 