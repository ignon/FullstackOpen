const Book  = require('./models/Book')

const loaders = {
  author: {
    getBookCounts: async (authorIDs) => {
      const bookQuery = { author: { $in: authorIDs } }
      const fieldsToReturn = { author: 1 }
      const books = await Book.find(bookQuery, fieldsToReturn)
      
      // Would be faster with lodash groupBy etc:
      const bookCounts = authorIDs.map(authorId =>
        books.filter(book => book.author.equals(authorId)).length
      )

      return bookCounts
    }
  }
}

module.exports = loaders