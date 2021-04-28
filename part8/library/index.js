const { ApolloServer, gql, UserInputError } = require('apollo-server')
let { books, authors } = require('./data')
const { v1: uuid } = require('uuid')

const typeDefs = gql`
  type Query {
    bookCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    findBook(title: String!): Book
    authorCount: Int!
    allAuthors: [Author!]!
    findAuthor(name: String!): Author
  }

  type Book {
    title: String!
    author: String!
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

  }
`

const resolvers = {
  Query: {
    authorCount: () => authors.length,
    allAuthors: () => authors,
    findAuthor: (root, args) =>
      authors.find(author => author.name === args.name),
    bookCount: () => books.length,
    allBooks: (root, args) => {
      let booksToReturn = [ ...books ]

      if (args.author) {
        booksToReturn = booksToReturn.filter(book => book.author === args.author)
      }
      if (args.genre) {
        booksToReturn = booksToReturn.filter(book => book.genres.includes(args.genre))
      }
      return booksToReturn
    },
    findBook: (root, args) =>
      books.find(book => book.title === args.title)
  },

  Author: {
    bookCount: (root, args) =>
      books.filter(book => book.author === root.name).length,
    born: (root, args) =>
      root.born
  },

  Mutation: {
    addBook: (root, args) => {
      if (books.find(b => b.title === args.title)) {
        throw new UserInputError('Title must be unique', {
          invalidArgs: args.title
        })
      }
      const author = (authors.find(author => author.name === args.author))
      if (!author) {
        authors = authors.concat({
          name: args.author,
          id: uuid()
        })
      }

      const book = { ...args, id: uuid() }
      books = books.concat(book)
      return book
    },
    editAuthor: (root, args) => {
      const author = authors.find(author => author.name == args.name)
      author.born = args.setBornTo
      return author
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})

// query {
//   bookCount
//   authorCount
// }

// query {
//   allBooks { 
//     title 
//     author
//     published 
//     genres
//   }
// }

// query {
//   allAuthors {
//     name
//     bookCount
//   }
// }

// query {
//   allBooks(author: "Robert Martin") {
//     title
//   }
// }

// bookCount
// allBooks {
//   title
//   author
//   genres
//   published
// }
// findBook(title: "Clean Code") {title author}

// mutation {
//   addBook(
//     title: "NoSQL Distilled2222",
//     author: "Arde",
//     published: 2012,
//     genres: ["database", "nosql"]
//   ) {
//     title,
//     author,
//     genres
//   }
// }
