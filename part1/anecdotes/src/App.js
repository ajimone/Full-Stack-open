import { useState } from 'react'

const points = new Uint16Array(10)
const copy = [...points]

const randomNum = (props) => {
  const rnum = Math.floor(Math.random() * props);
  return rnum;
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

  const [selected, setSelected] = useState(0)
  const [current, setCurrent] = useState(0)
  const [max, setMax] = useState(0)
  const [maxSent, setMaxSent] = useState(0)

  const setValueSelected = () => {
    const rand = randomNum(anecdotes.length)
    setSelected(rand)
    setCurrent(copy[rand])
  }

  const voting = () => {
    copy[selected] += 1
    setCurrent(copy[selected])
    if (copy[selected] > max) {
      setMax(copy[selected]);
      setMaxSent(selected);
    }
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{anecdotes[selected]}</p>
      <p>has {current} votes</p>
      <button onClick={voting}>Vote</button>
      <button onClick={setValueSelected}>Next Anecdote</button>
      <h2>Anecdote with most votes </h2>
      <p>{anecdotes[maxSent]}</p>
      <p>has {max} votes</p>
    </div>
  )
}

export default App;
