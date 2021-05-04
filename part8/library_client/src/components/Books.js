import { useLazyQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { ALL_BOOKS } from '../queries'
// import { useQuery } from '@apollo/client'

const Books = ({ show }) => {
  const [getAllBooks, allBooks] = useLazyQuery(ALL_BOOKS, {
    fetchPolicy: 'cache-first'
  })
  const [genre, setGenre] = useState('nosql')
  
  useEffect(() => {
    console.log(genre)
    getAllBooks({ variables: {genre} })
  }, [genre]) //eslint-disable-line

  if (!show) {
    return null
  }

  console.log(genre)
  // console.log(allBooks)

  if (allBooks.loading) {
    return <div>Loading...</div>
  }
  if (allBooks.error) {
    return <div>{allBooks.error.message}</div>
  }
  if (!allBooks.data) {
    return <div>AllBooks data</div>
  }



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
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
              <td>{(book.genres || []).join(', ')}</td>
            </tr>
          )}
        </tbody>
      </table>

      <button onClick={() => setGenre('nosql')}>nosql</button>
      <button onClick={() => setGenre('database')}>database</button>
      <button onClick={() => setGenre('McKoppa')}>McKoppa</button>
      <br />
      {genre}
    </div>
  )
}

export default Books