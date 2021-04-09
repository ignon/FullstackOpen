const User = require('../models/user')
const Blog = require('../models/blog')
const blogRouter = require('express').Router()
// app.js:n import 'express-async-errors' handles try catches for us
const jwt = require('jsonwebtoken')

const getTokenFromRequest = (request) => {
  const auth = request.get('authorization')
  if (auth && auth.toLowerCase().startsWith('bearer'))
    return auth.substring(7)

  return null
}


blogRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })
  response.json(blogs.map(blog => blog.toJSON()))
})

blogRouter.post('/', async (request, response) => {

  const body = request.body
  const token = getTokenFromRequest(request)
  if (!token)
    return response.status(401).json({ error: 'token missing' })

  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!token || !decodedToken.id)
    return response.status(401).json({
      error: 'token missing or invalid'
    })

  const userId = decodedToken.id
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