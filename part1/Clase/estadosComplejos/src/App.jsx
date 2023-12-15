import { useState } from "react"

const Button = (props) => {

  return(
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )

}

const App =  () => {

  const [value, setValue] = useState(0)
  
  return (
    <>

      {value}

      <Button handleClick={() => setValue(1000)} text="Mil"/>
      <Button handleClick={() => setValue(0)} text="Resetear"/>
      <Button handleClick={() => setValue(value + 1)} text="Incrementar"/>

    </>
  )
}

export default App
