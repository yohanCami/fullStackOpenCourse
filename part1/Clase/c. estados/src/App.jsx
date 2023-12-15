// const Hello = ({name, age}) => {

//   // const bornYear = () => {
//   //   const yearNow = new Date().getUTCFullYear()
//   //   return yearNow - props.age
//   // }

//   // const name = props.name
//   // const age = props.age

//   // const {name, age} = props

//   const bornYear = () =>new Date().getFullYear - age
  

//   return (
//     <>
//       <p>
//         Hello {name}, tu tienes {age} años de edad
//       </p>

//       <p>
//         Tu probablemente naciste en el año {bornYear()}
//       </p>
//     </>
//   )
// }

// const App1 = () => {

//   const name = 'Peter'
//   const age = 10

//   return (
//     <>

//       <h1>Grettings</h1>
//       <Hello name ="Maya" age={26 + 10}/>
//       <Hello name={name} age={age}/>
      
//     </>
//   )
// }

import { useState } from "react"

// const Display = ({counter}) => {

//   return (
//     <>{counter}</>
//   )
// }

const Display = ({counter}) => <>{counter}</>
 

// const Button = (props) => {
//   return (
//     <button onClick={props.handleClick}>
//       {props.text}
//     </button>
//   )
// }

const Button = ({onSmash, text}) => <button onClick={onSmash}> {text} </button>

const App = () => {

  const [counter, setCounter] = useState(0)
  console.log('rendering with counter value', counter)

  // setTimeout(
  //   () => setCounter(counter + 1),
  //   1000
  // )

  // console.log('rendering...', counter)

  // const {counter} = props

  // const handleClick = () => {
  //   console.log('Clicked')
  // }

  const increaseByOne = () => {
    console.log('increasing, value before', counter)
    setCounter(counter + 1) 
    
  }
  const decreaseByOne = () => {
    console.log('decreasing, value before', counter)
    setCounter(counter - 1)
    
  }
  const setToZero = () => {
    console.log('resetting to zero, value before', counter)
    setCounter(0)
  }

  return (
    <>

      <Display counter={counter}/>

      <Button onSmash={increaseByOne} text='siguiente'/>
      <Button onSmash={decreaseByOne} text='anterior'/>
      <Button onSmash={setToZero} text='cero'/>

      {/* <button onClick={increaseByOne}>
        siguiente
      </button>

      <button onClick={setToZero}>
        cero
      </button> */}

    </>
  )
}

export default App
