import { useState, useEffect } from 'react'
// import axios from 'axios'
import Note from './componentes/Note'
import noteService from './services/notes'

const App = () => {

  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    // console.log('effect')
    noteService
      .getAll()
      .then(initialNotes => {
        // console.log('promise fulfilled');
        setNotes(initialNotes)
      })
  }, [])

  // console.log('render', notes.length, 'notes')

  const addNote = (event) => {

    //Event es el evento que activa la llamada a la función, en este caso el formulario

    event.preventDefault() //Evita que la página se recargue al enviar el formulario
    //console.log('button clicked', event.target);

    const id = notes.length + 1

    //Crear la plantilla de la nueva nota
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      id: `${id}`,
    }

    noteService
      .create(noteObject)
      .then(returnedNote => {
        // console.log(response);

        //Se hace una copia de las notas y se une la nueva nota
        setNotes(notes.concat(returnedNote))

        //Se actualiza el estado de la nueva nota
        setNewNote('')
      })



  }

  const handleNoteChange = (event) => {
    //console.log(event.target.value);

    //Para que se pueda modificar el contenido del input
    setNewNote(event.target.value)
  }

  //Dependiendo del estado muestra todas las notas o solo las importantes
  //Usa un operador condicional
  const notesToShow = showAll ? notes : notes.filter(note => note.important === true)

  //console.log(notes);

  const toggleImportanceOf = (id) => {
    // console.log('importance of ' + id + ' needs to be toggled')

    // console.log(`importance of ${id} needs to be toggled`)

    // const url = `http://localhost:3001/notes/${id}`
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    // axios.put(url, changedNote).then(response => {
    //   setNotes(notes.map(note => note.id !== id ? note : response.data))
    // })

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error => {
        alert(
          `the note '${note.content}' was already deleted from server ${error}`
        )
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  return (
    <>

      <h1>Notes</h1>

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

    </>
  )
}

export default App
