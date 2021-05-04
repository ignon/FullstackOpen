import React from 'react'
// import { useQuery } from '@apollo/client'

const Books = ({show, result}) => {
  
  if (!show) {
    return null
  }

  if (result.loading) {
    return <div>Loading...</div>
  }

  const books = result.data.allBooks
  console.log(books)
  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(book =>
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Books