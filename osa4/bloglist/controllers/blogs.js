const User = require('../models/user')
const Blog = require('../models/blog')
const blogRouter = require('express').Router()
// app.js:n import 'express-async-errors' handles try catches for us


// All but GET methods require authentication
blogRouter.use((request, response, next) => {
  if (request.userId) return next()
  if (request.method === 'GET') return next()

  return response.status(401).json({
    error: 'invalid or missing token' }
  )
})


blogRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })
  response.json(blogs.map(blog => blog.toJSON()))
})

blogRouter.post('/', async (request, response) => {
  const body = request.body
  const userId = request.userId
  const user = await User.findById(userId)

  const newBlog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  const savedBlog = await newBlog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.json(savedBlog.toJSON())
})

blogRouter.get('/:id', async (request, response) => {
  const blog = await Blog
    .findById(request.params.id)
    .populate('user', { username: 1, name: 1 })

  if (blog) response.json(blog)
  else      response.status(404).end()
})

blogRouter.delete('/:id', async (request, response) => {
  const userId = request.userId
  const blog = await Blog.findById(request.params.id)
  if (!blog) return response.status(404).json({
    error: 'Blog has already been removed from the server'
  })

  // Informing user without permissions (/potential hacker)
  // that blog with corresponding id exist might be bad design?
  if (blog.user.toString() !== userId)
    return response.status(401).json({
      error: 'You dont have permission to modify that blog'
    })

  const result = await Blog
    .findByIdAndRemove(request.params.id)

  if (result) response.status(204).end()
  else        response.status(500).json({ error: 'Deleting the blog failed' })

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