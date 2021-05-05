import React, { useState } from 'react'
import { ADD_BOOK, ALL_BOOKS, ALL_AUTHORS } from '../queries'
import { useField, getNested } from '../utils/utils'
import { useMutation } from '@apollo/client'

const NewBook = ({ show, updateCacheWith, setError }) => {
  const title = useField('text')
  const author = useField('text')
  const published = useField('number')
  const genre = useField('text')
  const [genres, setGenres] = useState([])
  // const client = useApolloClient()

  const [ addBook ] = useMutation(ADD_BOOK, {
    refetchQueries: [
      { query: ALL_BOOKS },
      { query: ALL_AUTHORS }
    ],
    onError: (error) => {
      // Missing required fields throw networkError INTERNAL_SERVER_ERROR instead of graphQLError: GRAPHQL_VALIDATION_ERROR
      // thanks to a recent apollo bug:
      // https://github.com/apollographql/apollo-server/issues/3498
      let errorMessage =
        getNested(error, ['networkError', 'result', 'errors', 0, 'message'])
        ?? getNested(error, ['graphQLErrors', 0, 'message'])
        ?? 'unknown error'
      setError(errorMessage)
    },
    update: (store, response) => {
      updateCacheWith(response.data.addBook)
    }
  })

  if (!show) {
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