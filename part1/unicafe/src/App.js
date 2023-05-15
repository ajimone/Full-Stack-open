import { useState } from 'react'

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value} {props.spec}</td>
    </tr>
  )
}

const Statistics = (props) => {
  if (props.gval + props.bval + props.nval === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return (
    <div>
      <table>
        <tbody>
          <StatisticLine text="Good" value={props.gval} />
          <StatisticLine text="Neutral" value={props.nval} />
          <StatisticLine text="Bad" value={props.bval} />
          <StatisticLine text="All" value={(props.gval + props.bval + props.nval)} />
          <StatisticLine text="Average" value={(props.gval + (props.bval*-1)) / (props.gval + props.bval + props.nval)} />
          <StatisticLine text="Positive" value={(props.gval / (props.gval + props.bval + props.nval)) * 100} spec="%" />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {

  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setValueGood = () => {
    setGood(good + 1)
  }

  const setValueNeutral = () => {
    setNeutral(neutral + 1)
  }

  const setValueBad = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h2>Give feedback </h2>
      <p>
        <Button handleClick={setValueGood} text="Good" />
        <Button handleClick={setValueNeutral} text="Neutral" />
        <Button handleClick={setValueBad} text="Bad" />
      </p>

      <h2>Statistics</h2>
      <Statistics gval={good} nval={neutral} bval={bad} />
    </div>
  )
}

export default App;
