import React, { useState } from 'react'
import { ADD_BOOK, ALL_BOOKS, ALL_AUTHORS } from '../queries'
import { useField } from '../utils/utils'
import { useMutation } from '@apollo/client'

const NewBook = (props) => {
  const title = useField('text')
  const author = useField('text')
  const published = useField('number')
  const genre = useField('text')
  const [genres, setGenres] = useState([])
  const [ addBook ] = useMutation(ADD_BOOK, {
    refetchQueries: [
      { query: ALL_BOOKS },
      { query: ALL_AUTHORS }
    ],
    onError: (error) => {
      const gqlError = error.graphQLErrors[0] || error.errors[0] || {}
      alert(gqlError.message) //setError(...)
    }
  })

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    
    addBook({
      variables: {
        title: title.getValue(),
        author: author.getValue(),
        published: parseInt(published.getValue(), 10),
        genres
      }
    })

    title.reset()
    published.reset()
    author.reset()
    genre.reset()
    setGenres([])
  }

  const addGenre = () => {
    setGenres(genres.concat(genre.getValue()))
    genre.reset()
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          <label>title</label>
          <input { ...title.getFields() }/>
        </div>
        <div>
          <label>author</label>
          <input { ...author.getFields() }/>
        </div>
        <div>
          <label>published</label>
          <input { ...published.getFields() }/>
        </div>
        <div>
          <input { ...genre.getFields() }/>
          <button onClick={addGenre} type="button">add genre</button>
        </div>
        <div>
          genres: {genres.join(' ')}
        </div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default NewBook