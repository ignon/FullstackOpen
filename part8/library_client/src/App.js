import React, { useState } from 'react'
import { useApolloClient, useQuery, useSubscription } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
// import Notify from './components/Notify'
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

  // const updateCacheWith = (addedBook) => {
  //   (addedBook.genres || []).forEach(genre => {
  //     const dataInStore = client.readQuery({ query: ALL_BOOKS })
  //     const includedIn = (set, object) => set.map(obj => obj.id).includes(object)
  //     if (!includedIn(dataInStore, addedBook)) {
  //       client.writeQuery({
  //         query: ALL_BOOKS,
  //         variables: { genre },
  //         data: {
  //           allBooks: dataInStore.allBooks.concat(addedBook)
  //         }
  //       })
  //     }
  //   })
  // }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log('SUBSCRIPTION:', subscriptionData)
    }
  })

  // console.log(booksResult, authorsResult)
  // console.log(page)

  // if (!token) {
  //   return (
  //     <div>
  //       <Notify errorMessage={errorMessage} />
  //       <h2>Login</h2>
  //       <LoginForm
  //         setToken={setToken}
  //         setError={notify}
  //       />
  //     </div>
  //   )
  // }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('books')
  }

  return (
    <div>
      <div>
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
      />

      <Books
        show={page === 'books'}
        result={booksResult}
      />

      <NewBook
        show={page === 'add'}
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