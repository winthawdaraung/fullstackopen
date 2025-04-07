import { useState } from 'react'


const Button = ( { onClick, text}) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const StatisticLine = ( { text, value }) => {
  return (<tr><td>{text}</td> <td>{value}</td></tr>)
}

const Statistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad;
  const positive = ((good / total) * 100).toFixed(1);
  const all = ((good * 1) + (bad * -1) + (neutral * 0));
  const average = (all / total).toFixed(1);
  if (total === 0) {
    return (
      <div>
        No feedback given yet
      </div>
    )
  }
  return (
    <table>
      <StatisticLine text='good' value={good}/>
      <StatisticLine text='neutral' value={neutral}/>
      <StatisticLine text='bad' value={bad}/>
      <StatisticLine text='total' value={total}/>
      <StatisticLine text='average' value={average}/>
      <StatisticLine text='positive' value={positive+ "%"}/>
    </table>
  )
}
const App = () => {

  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);


  const increaseGood = () => {
    setGood(good + 1);
  }
  
  const increaseNeutral = () => {
    setNeutral(neutral + 1);
  }
  
  const increaseBad = () => {
    setBad(bad + 1);
  }
  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={increaseGood} text="good" />
      <Button onClick={increaseNeutral} text="neutral" />
      <Button onClick={increaseBad} text="bad"/>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App;