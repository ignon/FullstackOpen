import React, { useState } from 'react'
import { useApolloClient, useQuery, useSubscription } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Notify from './components/Notify'
import { ALL_BOOKS, ALL_AUTHORS, BOOK_ADDED } from './queries'
import LoginForm from './components/LoginForm'



const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const booksResult = useQuery(ALL_BOOKS)
  const authorsResult = useQuery(ALL_AUTHORS)

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => set.map(obj => obj.id).includes(object.id)

    let wasNewAddition = false
    addedBook.genres.concat('all').forEach(genre => {
      const variables = (genre === 'all') ? null : { genre }
      const dataInStore = client.readQuery({ query: ALL_BOOKS, variables })
      
      if (dataInStore && !includedIn(dataInStore.allBooks, addedBook)) {
        wasNewAddition = true
        client.writeQuery({
          query: ALL_BOOKS,
          variables,
          data: {
            allBooks: dataInStore.allBooks.concat(addedBook)
          }
        })
      }
    })
    return wasNewAddition
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log('SUBSCRIPTION:', subscriptionData)
      const addedBook = subscriptionData.data.bookAdded
      const wasNewAddition = updateCacheWith(addedBook)
      if (wasNewAddition) {
        alert(`${addedBook.title} added`)
      }
    }
  })

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('books')
  }

  return (
    <div>
      <div>
        <Notify errorMessage={errorMessage}/>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {(!token)
          ? <button onClick={() => setPage('login')}>login</button>
          : <>
              <button onClick={() => setPage('add')}>add book</button>
              <button onClick={logout}>logout</button>
            </>
        }
        
      </div>

      <Authors
        show={page === 'authors'}
        result={authorsResult}
        setError={notify}
      />

      <Books
        show={page === 'books'}
        result={booksResult}
      />

      <NewBook
        show={page === 'add'}
        updateCacheWith={updateCacheWith}
        setError={notify}
      />
      <LoginForm
        show={page === 'login'}
        setToken={setToken}
        setError={notify}
        setPage={setPage}
      />
    </div>
  )
}

export default App