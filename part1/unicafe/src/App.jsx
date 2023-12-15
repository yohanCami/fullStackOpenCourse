import { useState } from "react"

const Button = ({handleClick, text}) => {

  return(
    <button onClick={handleClick}>
      {text}
    </button>
  )

}

const StatisticLine = ({text, value}) => {

  return(
    <>
    <tr>
      <td>
        {text}
      </td>
      <td>
        {value}
      </td>
    </tr>
       
    </>
  )

}

const Statistics = ({data}) => {

  const all = data.good + data.neutral + data.bad

  let avarage = (data.good - data.bad) / all
  let positive = (data.good / all) * 100

  if (all === 0){

    return(
      <p>No feedback given</p>
    )

  }else{

    avarage = avarage.toFixed(1)
    positive = positive.toFixed(1)

    return(
      <>

      <table>

        <tbody>
        
          <StatisticLine text='good' value={data.good}/>
          <StatisticLine text='neutral' value={data.neutral}/>
          <StatisticLine text='bad' value={data.bad}/>
          <StatisticLine text='all' value={all}/>
          <StatisticLine text='avarage' value={avarage}/>
          <StatisticLine text='positive' value={positive + '%'}/>

        </tbody>

      </table>
        
        

      </>
    )

  }
  

}

const App = () => {

  const [feedback, setFeep] = useState({good: 0, neutral: 0, bad:0})

  const handleClickGood = () => setFeep({...feedback, good: feedback.good + 1})
  const handleClickNeutral = () => setFeep({...feedback, neutral: feedback.neutral + 1})
  const handleClickBad = () => setFeep({...feedback, bad: feedback.bad + 1})

  

  return (
    <>
      <h1>give feedback</h1>

      <Button handleClick={handleClickGood} text='good'/> 
      <Button handleClick={handleClickNeutral} text='neutral'/> 
      <Button handleClick={handleClickBad} text='bad'/> 

      <h1>statistics</h1>

      <Statistics data={feedback}/>  
    </>
  )
}

export default App
