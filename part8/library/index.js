const { PubSub } = require('apollo-server')
const pubsub = new PubSub()

const Book = require('./models/Book')
const Author = require('./models/Author')
const User = require('./models/User')
const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')
const { findByIdAndUpdate } = require('./models/Book')
const mongoose = require('mongoose')
const DataLoader = require('dataloader')
const loaders = require('./loaders')

const MONGODB_URI = ''
const JWT_SECRET = 'elämä on laiffii'
const jwt = require('jsonwebtoken')

const typeDefs = require('./typeDefs')


mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})
  .then(() => console.log('connected to MongoDB'))
  .catch((error) => console.log('error connection to MongoDB', error.message))


const resolvers = {
  Query: {
    authorCount: () => Author.collection.countDocuments(),
    allAuthors: () => Author.find({}),
    findAuthor: (root, args) => Author.findOne({ name: args.name }),
    bookCount: () => Book.collection.countDocuments(),
    allBooks: async (root, args) => {
      const { genre, author } = args

      const query = {}
      if (genre) query.genres = { $in: [genre] }
      
      if (author) {
        const authorObj = await Author.findOne({ name: author })
        query.author = authorObj._id
      }

      return Book
        .find(query)
        .populate('author', { name: 1, born: 1 })
    },
   findBook: (root, args) => Book.findOne({ title: args.title }),
   me: (root, args, context) => context.currentUser
  },

  Author: {
    bookCount: async (book, args, context) => {
      const { bookCount } = context.loaders
      return await bookCount.load(book._id)
    }
  },

  Mutation: {
    addBook: async (root, args, context) => {
      const { title, published, genres, author } = args
      const { currentUser } = context

      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      let authorObj = await Author.findOne({ name: author })
      if (!authorObj) {
        authorObj = new Author({ name: author })
      }
      
      try {
        await authorObj.save()
        const book = new Book({ ...args, author: authorObj._id })
        await book.save()

        const bookToReturn = book.toJSON()
        bookToReturn.author = authorObj.toJSON()

        pubsub.publish('BOOK_ADDED', { bookAdded: bookToReturn })

        return bookToReturn
      }
      catch(error) {
        throw new UserInputError('Input error ' + error.message, { invalidArgs: true })
      }
    },
    editAuthor: async (root, args, context) => {
      const { currentUser } = context

      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      const author = await Author.findOne({ name: args.name })
      author.born = args.setBornTo

      return author
        .save()
        .catch((error) => {
          throw new UserInputError(error.message, {
            invalidArgs: true
          })
        })
    },
    createUser: (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre
      })

      return user
        .save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args
          })
        })

    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new UserInputError('wrong credentials')
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  }
}


const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const context = {
      loaders: {
        bookCount: new DataLoader(authorIDs => loaders.author.getBookCounts(authorIDs))
      }
    }

    const auth = req ? req.headers.authorization : null

    if (auth && auth.toLowerCase().startsWith('bearer')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )

      const currentUser = await User
        .findById(decodedToken.id).populate('friends')
      
      context.currentUser = currentUser
    }

    return context
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscription ready at ${subscriptionsUrl}`)
})