import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.content.value
    event.target.content.value = ''
    dispatch(createAnecdote(content))
    dispatch(setNotification(`You added anecdote '${content}'`))
  }
  return (
    <form onSubmit={addAnecdote}>
      <div><input name="content" /></div>
      <button type="submit">create</button>
    </form>
  )
}


export default AnecdoteForm