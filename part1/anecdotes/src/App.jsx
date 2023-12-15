import { useState } from 'react'

const Votes = ({vote}) => {

  return(
    <p>Has {vote} votes</p>
  )

}

const MaxVotes = ({anecdotes, votes}) => {

  const maximo = Math.max(...votes);
  const indice = votes.indexOf(maximo);

  const anecdote = anecdotes[indice]
  const vote = votes[indice]

  return(
    <>
      <h1>Anecdote with most votes</h1>
      <p>{anecdote}</p>
      <p>Has {vote} votes</p>
    </>
  )
}

const App = () => {

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  // function getRandomInt(min, max) {
  //   return Math.floor(Math.random() * (max - min + 1)) + min;
  // }

  function getRandomInt() {
    return Math.floor(Math.random() * 7);
  }

  const [selected , setSelected] = useState(getRandomInt())
  const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0, 0, 0])

  const handleClickChange = () => setSelected(getRandomInt())
  const handleClickVote = () => {

    let newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)
  }

  return (
    
    <>
    <div>
      {anecdotes[selected]}
    </div>

    <Votes vote={votes[selected]}/>

    <button onClick={handleClickVote}>vote</button>
    <button onClick={handleClickChange}>next anecdote</button>

    <MaxVotes anecdotes={anecdotes} votes={votes}/>
      
    </>
  )
}

export default App
