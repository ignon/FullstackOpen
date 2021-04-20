import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
// import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setFilterString } from '../reducers/filterReducer'

const Filter = (event) => {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    const filter = event.target.value
    dispatch(setFilterString(filter))
  }

  return (
    <div>
      Filter
      <input onChange={handleChange} />
      <br />
      <br />
    </div>
  )
    // value={filter}
    // onChange={handleNewFilter}

}

export default Filter