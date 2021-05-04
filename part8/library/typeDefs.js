const { gql } = require('apollo-server')

const typeDefinitions = gql`
  type Query {
    bookCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    findBook(title: String!): Book
    authorCount: Int!
    allAuthors: [Author!]!
    findAuthor(name: String!): Author
    me: User
  }

  type Subscription {
    bookAdded: Book!
  }

  type Book {
    title: String!
    author: Author!
    published: Int!
    genres: [String]!
    id: ID!
  }

  type Author {
    name: String!
    bookCount: Int!
    born: Int
    id: ID!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String]!
    ): Book

    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author

    createUser(
      username: String!
      favoriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ):Token
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }
`

module.exports = typeDefinitions