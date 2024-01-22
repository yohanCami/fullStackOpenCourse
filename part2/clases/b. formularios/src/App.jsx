import { useState } from 'react'
import Note from './componentes/Note'

const App = (props) => {

  const [notes, setNotes] = useState(props.notes)
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
 
  const addNote = (event) => {

    //Event es el evento que activa la llamada a la función, en este caso el formulario

    event.preventDefault() //Evita que la página se recargue al enviar el formulario
    //console.log('button clicked', event.target);

    //Crear la plantilla de la nueva nota
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      id: notes.length + 1,
    }

    //Se hace una copia de las notas y se une la nueva nota
    setNotes(notes.concat(noteObject))

    //Se actualiza el estado de la nueva nota
    setNewNote('')
    
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
  
  return (
    <>

      <h1>Notes</h1>

      <ul>
    
        {
          /* Anti-patron */
          notesToShow.map(note => (
            <Note key={note.id} note={note} />
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
