require('dotenv').config()
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const commentSchema = mongoose.Schema({
  text: {
    type: String,
    minlength: 3,
    required: true
  }
})


const blogSchema = mongoose.Schema({
  title: {
    type: String,
    minlength: 3,
    required: true,
    unique: true
  },
  author: {
    type: String,
    minlength: 3,
    required: true,
  },
  url: {
    type: String,
    minlength: 3,
    required: true,
  },
  likes: {
    type: Number,
    default: 0
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  comments: [commentSchema]
})


blogSchema.plugin(uniqueValidator)

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v

    for(const comment of returnedObject.comments) {
      comment.id = comment._id.toString()
      delete comment._id
    }
  }
})


const Blog = mongoose.model('Blog', blogSchema, 'blogs')
module.exports = Blog
