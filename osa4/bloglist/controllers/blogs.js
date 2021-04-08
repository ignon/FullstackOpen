const { request } = require('../app')
const Blog = require('../models/blog')
const blogRouter = require('express').Router()
// app.js:n import 'express-async-errors' handles try catches for us

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs.map(blog => blog.toJSON()))
})

blogRouter.post('/', async (request, response) => {
  const newBlog = new Blog(request.body)
  const savedBlog = await newBlog.save()

  response.status(201).json(savedBlog.toJSON())
})

blogRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)

  if (blog) response.json(blog)
  else      response.status(404).end()
})

blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
  const blogId = request.params.id
  const blogData = request.body

  const validationError = (new Blog(blogData)).validateSync()
  if (validationError) {
    return response.status(400).json({
      error: validationError.message
    })
  }

  const result = await Blog.findByIdAndUpdate(blogId, blogData, { new: true })
  if (result) response.status(200).json(result)
  else        response.status(400).json({ error: `${blogData.title} has already been removed from the server` })
})


module.exports = blogRouter