import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  
  /*
  Käytä setGood, setNeutral, setBad jne Buttonin callbackkina!
  Käytä muuttujia good, neutral, bad Statistics-välilehdellä.
  Anna funktio referenssillä Buttons-luokalle ja muuttujat argumenttina
  */
  return (
    <div>
      <Header />
      <Button
        text={'Good'}
        onClick={() => setGood(good + 1)}
      />
      <Button
        text={'Neutral'}
        onClick={() => setNeutral(neutral + 1)}
      />
      <Button
        text={'Bad'}
        onClick={() => setBad(bad + 1)}
      />
      <Statistics votes={{good, neutral, bad}}/>
    </div>
  )
}

const Statistics = (props) => {
  const {good, neutral, bad} = props.votes
  
  const totalVotes = good + neutral + bad

  if (totalVotes <= 0)
    return (
      <div>
        <h2>Statistics</h2>
        <p>No feedback given</p>
      </div>
    )
  
  const averageScore = (good - bad) / totalVotes // good*1 + neutral*0 + bad*(-1)
  const percentagePositive = good / totalVotes * 100



  return (
    <div>
      <h2>Statistics</h2>
      <table>
          <tbody>
          <StatisticLine text='Good'    value={good} />
          <StatisticLine text='Neutral' value={neutral} />
          <StatisticLine text='Bad'     value={bad} />
          <StatisticLine text='All'     value={totalVotes} />
          <StatisticLine text='Average' value={averageScore} />
          <StatisticLine text='Positive' value={percentagePositive} unit='%'/>
        </tbody>
      </table>
    </div>
  )
}

const StatisticLine = ({text, value, unit=''}) => (
  <tr>
    <td>{text}</td><td>{value}{unit}</td>
  </tr>
)

const Header = () => (
  <h1>Give Feedback</h1>
)

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

ReactDOM.render(<App />, 
  document.getElementById('root')
)


/*import React, {useState} from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);
  const [allClicks, setAll] = useState([]);

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    setLeft(left + 1)
  }
  
  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    setRight(right + 1)
  }
  
  console.log('a')
  debugger
  console.log('b')

  return (
    <div>
      <div>
        {left}
        <Button
          text='Left'
          onClick={handleLeftClick}
        />
        <Button
          text='Right'
          onClick={handleRightClick}
        />
        <History allClicks={allClicks} />
      </div>
    </div>
  )
}

const History = ({allClicks}) => {
  if (allClicks.length === 0) 
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  
    return (
      <div>{allClicks.join(' ')}</div>
    )
}

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)


ReactDOM.render(
  <App />,
  document.getElementById('root')
)
*/