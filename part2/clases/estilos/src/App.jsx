import { useState, useEffect } from 'react'
// import axios from 'axios'
import Note from './components/Note'
import noteService from './services/notes'
import './index.css'

const Footer = () => {

  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }

  return(
    <div style={footerStyle}>
      <br />
      <em>Note app, Departamet of Comupter Science, University of Helsinki</em>
    </div>
  )
}

const Notificacion = ({ message }) => {

  if (message === null) {
    return null
  }

  return(
    <div className='error'>
      { message }
    </div>
  )
}

const App = () => {

  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  // const [styleMessage, setStyleMessage] = useState({})

  useEffect(() => {

    noteService
      .getAll()
      .then(initialNotes => {
  
        setNotes(initialNotes)
      })
  }, [])


  const addNote = (event) => {

    event.preventDefault() 

    const id = notes.length + 1

    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      id: `${id}`,
    }

    noteService
      .create(noteObject)
      .then(returnedNote => {

        setNotes(notes.concat(returnedNote))
        setNewNote('')

        // setStyleMessage({
        //   color: "red",
        //   background: "lightgrey",
        //   fontSize: "20px",
        //   borderStyle: "solid",
        //   borderRadius: "5px",
        //   padding: "10px",
        //   marginBottom: "10px"
        // })

        // setErrorMessage(
        //   `Note '${note.content}' was already removed from server`
        // )
        // setTimeout(() => {
        //   setErrorMessage(null)
        // }, 5000)


      })

  }

  const handleNoteChange = (event) => {

    setNewNote(event.target.value)
  }

  const notesToShow = showAll ? notes : notes.filter(note => note.important === true)

  const toggleImportanceOf = (id) => {

    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(() => {

        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)

        setNotes(notes.filter(n => n.id !== id))
      })
  }

  return (
    <>

      <h1>Notes</h1>

      <Notificacion message={errorMessage}/>

      <ul>

        {
          /* Anti-patron */
          notesToShow.map(note => (
            <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)}/>
          ))
        }
      </ul>

      <button onClick={() => setShowAll(!showAll)}>
        Ver {showAll ? 'importante': 'todo'}
      </button>

      <form onSubmit={addNote}>
        <input type="text" value={newNote} onChange={handleNoteChange}/>
        <button type='submit'>Guardar</button>
      </form>

      <Footer />

    </>
  )
}

export default App
