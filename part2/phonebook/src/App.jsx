import { useState, useEffect } from 'react'
import personService from './services/persons'

//Notificación

const Notificacion = ({ message, styleMessage }) => {

  if (message === null) {
    return null
  }

  return(
    <div style={styleMessage}>
      { message }
    </div>
  )
}

//FILTRO

const Filter = ({filter, handleMethod}) => {

  return(
    <div>
        filter shown with: <input value={filter} onChange={handleMethod}/>
    </div>
  )

}

//PERSON FORM CON PERSON INPUT

const PersonInputForm = ({input, newInput, setInput}) => {

  const handleInputChange = (event) => {
    setInput(event.target.value)
  }

  return(

    <div>
      {input}: <input value={newInput} onChange={handleInputChange}/>
    </div>

  )
}

const PersonForm = ({persons, setPersons, setNotMessage, setStyleMessage}) => {

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const addPerson = (event) => {

    //console.log(event.target)

    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber,
    };
    
    const isAlreadyRegistered = persons.some(person => person.name === newName);
    
    if (isAlreadyRegistered) {
      // alert(`${newName} is already added to phonebook`);

      const person = persons.find(p => p.name === newName)
      
      // console.log(newName);
      // console.log(person);

      if (window.confirm(`${person.name} is already added to phonebook, replace the old number with a new one?`)) {

         personService
          .update(person.id, personObject)
          .then(() => {
            setPersons(persons.map(p => p.id != person.id ? p : personObject))
          })
          .catch(() => {
            
            setStyleMessage({
              color: "red",
              background: "lightgrey",
              fontSize: "20px",
              borderStyle: "solid",
              borderRadius: "5px",
              padding: "10px",
              marginBottom: "10px"
            })
            
            setNotMessage(
              `Information of ${person.name} has already been removed from server`
            )
            setTimeout(() => {
              setNotMessage(null)
            }, 5000)

            setPersons(persons.filter(p => p.id != person.id))
  

          })

      }

      console.log(newName);
      console.log(person);

    } else {

      personService
        .create(personObject)
        .then(newPerson => {
          setPersons(persons.concat(newPerson));

          setStyleMessage({
            color: "green",
            background: "lightgrey",
            fontSize: "20px",
            borderStyle: "solid",
            borderRadius: "5px",
            padding: "10px",
            marginBottom: "10px"
          })

          setNotMessage(
            `Added ${personObject.name}`
          )
          setTimeout(() => {
            setNotMessage(null)
          }, 5000)
          })
        .catch(error => {
          
          setStyleMessage({
            color: "red",
            background: "lightgrey",
            fontSize: "20px",
            borderStyle: "solid",
            borderRadius: "5px",
            padding: "10px",
            marginBottom: "10px"
          })
          
          console.log(error);

          setNotMessage(
            `Added ${error.message}`
          )
          setTimeout(() => {
            setNotMessage(null)
          }, 5000)

        })
      
    }

    setNewName('')
    setNewNumber('')

  }

  return (

    <form onSubmit={addPerson}>
      <PersonInputForm input='name' newInput={newName} setInput={setNewName}/>
      <PersonInputForm input='number' newInput={newNumber} setInput={setNewNumber}/>

      <div>
        <button type="submit">add</button>
      </div>
    </form>

  )
}

//PERSONS

const Persons = ({filter, persons, setPersons, setNotMessage, setStyleMessage}) => {

  const deletePersonOf = (id) => {

    const person = persons.find(p => p.id === id)

    if (window.confirm(`Delete ${person.name}?`)) {
        personService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter(person => person.id != id))
        })
        .catch(() => {
            
          setStyleMessage({
            color: "red",
            background: "lightgrey",
            fontSize: "20px",
            borderStyle: "solid",
            borderRadius: "5px",
            padding: "10px",
            marginBottom: "10px"
          })
          
          setNotMessage(
            `Information of ${person.name} has already been removed from server`
          )
          setTimeout(() => {
            setNotMessage(null)
          }, 5000)

          setPersons(persons.filter(person => person.id != id))
        })
    }

  }

  return(

    <>
      {filter === ''
        ? persons.map((person, index) => (
          <p key={index}>{person.name} {person.number} <button onClick={() => deletePersonOf(person.id)}>delete</button></p>
          ))

        : persons
          .filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
          .map((filteredPerson, index) => (
            <p key={index}>{filteredPerson.name} {filteredPerson.number} <button>delete</button></p> 
          ))
      }
    </>

  )
}

//COMPONENTE APP

const App = () => {

  const [ persons, setPersons ] = useState([]) 
  const [notificationMessage, setNotMessage] = useState(null)
  const [styleMessage, setStyleMessage] = useState({})

  useEffect(() => {
    // console.log('Inicia el effect');
    personService
      .getAll()
      .then(initialPersons => {
        // console.log('Promesa completa')
        setPersons(initialPersons)
      })
  }, [])

  const [ filter, setFilter ] = useState('')

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Notificacion message={notificationMessage} styleMessage={styleMessage}/>

      <Filter filter={filter} handleMethod={handleFilterChange} />

      <h2>add a new</h2>

      <PersonForm persons={persons} setPersons={setPersons} setNotMessage={setNotMessage} setStyleMessage={setStyleMessage}/>

      <h2>Numbers</h2>

      <Persons filter={filter} persons={persons} setPersons={setPersons} setNotMessage={setNotMessage} setStyleMessage={setStyleMessage}/>

    </div>
  )
}

export default App
