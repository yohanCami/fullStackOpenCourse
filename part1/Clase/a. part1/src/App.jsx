const Hello = (props) => {

  console.log(props)

  return (
    <div>
      <p>Hello world {props.name}, tu tienes {props.age} años de edad</p>
    </div>
  )
}

const Prueba = () => {
  const friends = ["Valentina", "Natalia"]

  console.log(friends)

  return (
    <>
      <p>{friends}</p>
    </>
  )
}

const App = () => {

  //const now = new Date()
  //const a = 10
  //const b = 20
  //console.log(now, a+b)


  //console.log('Hello from component')

  const name = 'Laura'
  const age = 20

  return (
    // <div>
    <>
      {/* <p>Hello world, hoy es {now.toString()}</p>

      <p>
        {a} más {b} es {a + b}
      </p> */}

      <h1>Greetings</h1>
      <Hello name = 'Camilo' age={10 + 9}/>
      <Hello name = {name} age = {age}/>
      <Prueba/>
      {/* <Hello /> */}
    
    </>

    // </div>
  )
}

export default App
