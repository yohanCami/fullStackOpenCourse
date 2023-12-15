import { useState } from "react"

const History = (props) => {

  if(props.allClicks.length === 0){
    return (
      <div>
        No se ha presionado ningún botón
      </div>
    )
  }else{
    return(
      <div>
        Los botones que se han presionado son: {props.allClicks.join(' ')}
      </div>
    )
  }

}

const Button = ({ handleClick, text}) => {

  return(
    <button onClick={handleClick}>
      {text}
    </button>
  )

}

const App =  () => {

  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])
  const [total, setTotal] = useState(0)

  //console.log(allClicks)

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))

    const updateLeft = left + 1
    setLeft(updateLeft)

    setTotal(updateLeft + right)
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))

    const updateRight = right + 1
    setRight(updateRight)

    setTotal(left + updateRight)
  }

  //const [clicks, setClicks] = useState({
  //   left: 0, right: 0
  // })

  // const handleLeftClick = () => {
  //   const newClicks = {
  //     left: clicks.left + 1,
  //     right: clicks.right
  //   }

  //   setClicks(newClicks)
  // }

  // const handleRightClick = () => {
  //   const newClicks = {
  //     left: clicks.left,
  //     right: clicks.right + 1
  //   }

  //   setClicks(newClicks)
  // }

  //Con objet spread

  // const handleLeftClick = () => {
  //   const newClicks = {
  //     ...clicks,
  //     left: clicks.left + 1
 
  //   }

  //   setClicks(newClicks)
  // }

  // const handleRightClick = () => {
  //   const newClicks = {
  //     ...clicks,
  //     right: clicks.right + 1
  //   }

  //   setClicks(newClicks)
  // }

  // const handleLeftClick = () => {
  //   setClicks({...clicks, left: clicks.left + 1})
  // }

  // const handleRightClick = () => {
  //   setClicks({...clicks, right: clicks.right + 1})
  // }

  return (
    <>
      {left}
      <Button handleClick={handleLeftClick} text='left'/>

      <Button handleClick={handleRightClick} text='right' />
      {right}

      <History allClicks={allClicks} />

      <p>Total: {total}</p>

    </>
  )
}

export default App
