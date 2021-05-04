import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
      id
    }
  }
`

export const UPDATE_BORN = gql`
  mutation updateBorn($name: String!, $setBornTo: Int!) {
    editAuthor(
      name: $name,
      setBornTo: $setBornTo
    ) {
      name
      born
    }
  }
`

export const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    genres
    published
    id

    author {
      name
      bookCount
      born
    }
  }
`

export const ADD_BOOK = gql`
  mutation addBook($title: String!, $author: String!,  $published: Int!,  $genres: [String!]!) {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

export const ALL_BOOKS = gql`
  query allBooks($author: String, $genre: String) {
    allBooks(
      author: $author
      genre: $genre
    ) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

export const LOGIN = gql`
  mutation login($username: String! $password: String!) {
    login(
      username: $username
      password: $password
    ) {
      value
    }
  }
`

// author
// published