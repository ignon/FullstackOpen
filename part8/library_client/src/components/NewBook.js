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
  // const client = useApolloClient()

  const [ addBook ] = useMutation(ADD_BOOK, {
    refetchQueries: [
      { query: ALL_BOOKS },
      { query: ALL_AUTHORS }
    ],
    onError: (error) => {
      // I wasn't able to get the error message to appear in right place :|
      try {
        const errorMessage = error.networkError.result.errors[0].message
        alert(errorMessage) //setError(...)
      }
      catch(e) {
        console.log((e))
        console.log(error)
      }
    },
    update: (store, response) => {
      
      const addedBook = response.data.addBook
      const bookGenres = addedBook.genres

      console.log('addedBook:', addedBook)
      console.log('bookGenres:', bookGenres)

      bookGenres.forEach(genre => {
        const variables = { genre }
        const dataInStore = store.readQuery({
          query: ALL_BOOKS,
          variables
        })

        if (!dataInStore) return

        console.log('deleting cache for genre:', genre)
        store.writeQuery({
          query: ALL_BOOKS,
          variables,
          data: {
            ...dataInStore,
            allBooks: [...dataInStore.allBooks, response.data.addBook]
          }
        })
      })
      // console.log(dataInStore)
      console.log('response: ', response)
      console.log(store)
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