import Note from './componentes/Note'

const App = ({notes}) => {

  return (
    <>

      <h1>Notes</h1>

      <ul>
        {/* <li>{notes[0].content}</li>
        <li>{notes[1].content}</li>
        <li>{notes[2].content}</li> */}

        {/* {
          notes.map(note => (
            <li key={note.id}>{note.content}</li>
          ))
        } */}

        {/* {
           Anti-patron
          notes.map((note, i) => (
            <li key={i}>{note.content}</li> />
          ))
        } */}

{
          /* Anti-patron */
          notes.map(note => (
            <Note key={note.id} note={note} />
          ))
        }
      </ul>
      
    </>
  )
}

export default App
