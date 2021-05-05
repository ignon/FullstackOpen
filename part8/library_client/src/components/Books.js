import { useApolloClient, useLazyQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { ALL_BOOKS } from '../queries'

const getGenres = (client) => {
  const dataInStore = client.readQuery({ query: ALL_BOOKS })
  const { allBooks } = dataInStore
  if (!allBooks) return []
  const genres = []
  allBooks.forEach(book => {
    book.genres.forEach(genre => {
       if (!genres.includes(genre)) genres.push(genre)
    })
  })

  return genres
}

const Books = ({ show }) => {
  const client = useApolloClient()
  const [getAllBooks, allBooks] = useLazyQuery(ALL_BOOKS, {
    fetchPolicy: 'cache-first'
  })
  const [genre, setGenre] = useState(null)
  
  useEffect(() => {
    const options = !genre
      ? {} : { variables: {genre} }
    getAllBooks(options)
  }, [genre]) //eslint-disable-line

  if (!show) {
    return null
  }

  if (allBooks.loading) {
    return <div>Loading...</div>
  }

  if (allBooks.error) {
    return <div>{allBooks.error.message}</div>
  }

  if (!allBooks.data) {
    return <div>AllBooks data</div>
  }
  const genres = getGenres(client)

  const books = allBooks.data.allBooks
  console.log(books)
  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
            <th>genres</th>
          </tr>
          {books.map(book =>
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
              {/* <td>{(book.genres || []).join(', ')}</td> */}
            </tr>
          )}
        </tbody>
      </table>
      
      {genres.map(genre =>
        <button key={genre} onClick={() => setGenre(genre)}>{genre}</button>
      )}
    </div>
  )
}

export default Books