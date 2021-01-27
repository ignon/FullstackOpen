import React, { useState } from 'react'
import ReactDOM from 'react-dom'



const randomInt = (max) =>
  Math.floor(Math.random() * max)

const App = (props) => {
  const {anecdotes} = props
  
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState([...zeroVotes]);

  const maxVotes = Math.max(...votes);
  const topAnecdote = votes.indexOf(maxVotes);

  console.log('render')
  console.log(votes.join(', '))

  
  
  
  // https://fullstackopen.com/osa1/monimutkaisempi_tila_reactin_debuggaus#tapahtumankasittelijan-vieminen-alikomponenttiin
  const getNewAnecdote = () =>
    () => {
      let nextSelected = randomInt(anecdotes.length);
      if (nextSelected === selected)
        nextSelected = (selected+1) % anecdotes.length;

      setSelected(nextSelected)
    }

  const updateVotes = () =>
    () => {
      const votesCopy = [...votes]
      votesCopy[selected]++;
      setVotes(votesCopy)
    }

  
  

  return (
    <div>
      <Anecdote
        title='Anecdote of the day'
        text={anecdotes[selected]}
        votes={votes[selected]}
      />
      <Button
        onClick={getNewAnecdote()}
        text={'Next anecdote'}
      />
      <Button
        onClick={updateVotes()}
        text={'Vote'}
      />
      <Anecdote
        title='Top Anecdote'
        text={anecdotes[topAnecdote]}
        votes={votes[topAnecdote]}
      />
    </div>
  )
}

const Anecdote = ({title, text, votes}) => (
  <div>
    <h1>{title}</h1>
    <p>{text}</p>
    <p>has {votes} votes</p>
  </div>
)


const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)


const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const zeroVotes = new Array(anecdotes.length+1).join('0').split('').map(parseFloat)


//console.log(anecdoteVotes)

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)