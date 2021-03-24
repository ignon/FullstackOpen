const Blog = require('../models/blog')
const blogRouter = require('express').Router()
const logger = require('../utils/logger')

blogRouter.get('/', (request, response) => {

  logger.info('BLOG GETTTTT')

  Blog
    .find({})
    .then(blogs => {blogs
      response.json(blogs)
    })
    .catch(error => {
      response.status(400).json(error)
    })
})

blogRouter.post('/', (request, response) => {
  //logger.info(request)
  const newBlog = new Blog(request.body)

  newBlog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

module.exports = blogRouter