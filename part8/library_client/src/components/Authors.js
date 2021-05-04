import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import { useField } from '../utils/utils.js'
import { ALL_AUTHORS, UPDATE_BORN } from '../queries'
import Select from 'react-select'


const Authors = ({ show, result }) => {
  const [name, setName] = useState('')
  const born = useField('number')

  const [ updateAuthor, updateAuthorResult ] = useMutation(UPDATE_BORN, {
    refetchQueries: [
      { query: ALL_AUTHORS }
    ],
    onError: (error) => {
      const gqlError = error.graphQLErrors[0]
      alert(gqlError.message)
    }
  })
  
  useEffect(() => {
    if (updateAuthorResult.data && updateAuthorResult.data.editAuthor.name == null) {
      alert('author not found')
    }
  }, [updateAuthorResult.data])

  if (!show) {
    return null
  }
  
  if (result.loading) {
    return <div>Loading...</div>
  }
  if (result.error) {
    return <div>{result.error.message}</div>
  }

  console.log(result.data)
  const authors = result.data.allAuthors
  const authorOptions = authors.map(author => ({
    value: author.name,
    label: author.name
  }))

  const handleUpdateAuthor = (event) => {
    event.preventDefault()
    updateAuthor({
      variables: {
        name: name.value,
        setBornTo: parseInt(born.getValue(), 10)
      }
    })
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <br />

      <form onSubmit={handleUpdateAuthor}>
          <label>Author </label>
          <Select
            defaultValue={name}
            onChange={setName}
            options={authorOptions}
          />
          <br />
          <label>Born </label>
          <input { ...born.getFields() } />
          <br />
          <button type='submit'>Update author</button>
      </form>
    </div>
  )
}

export default Authors