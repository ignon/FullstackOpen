import anecdoteService from "../services/anecdotes"

const voteSorter = (anec1, anec2) => anec2.votes - anec1.votes 

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', JSON.stringify(action))
  console.log('action data', action.data)

  switch(action.type) {
    case 'INIT_ANECDOTES':
      const anecdotes = action.data
      return anecdotes.sort(voteSorter) 

    case 'ADD_LIKE':
      const newAnecdote = action.data
      return state.map(anecdote =>
          (anecdote.id === newAnecdote.id) ? newAnecdote : anecdote
      ).sort(voteSorter)

    case 'CREATE_ANECDOTE':
      const anecdote = action.data
      return state.concat(anecdote)
    default:
      return state
  }
}

export const initalizeAnecdotes = (anecdotes) => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const anecdote = await anecdoteService.createNew(content)

    dispatch({
      type: 'CREATE_ANECDOTE',
      data: anecdote
    })
  }
}

export const voteAnecdote = (anecdote) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.vote(anecdote)
    dispatch({
      type: 'ADD_LIKE',
      data: newAnecdote
    })
  }
}

export default reducer