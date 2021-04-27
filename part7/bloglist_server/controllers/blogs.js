const User = require('../models/user')
const Blog = require('../models/blog')
const { update } = require('../models/user')
const blogRouter = require('express').Router()


const requireAuth = (request, response, next) => {
  if (request.token && request.userId) return next()

  return response.status(401).json({
    error: 'invalid or missing token'
  })
}


blogRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })
  response.json(blogs.map(blog => blog.toJSON()))
})

blogRouter.post('/:id/comments', requireAuth, async (request, response) => {
  // const userId = request.userId
  const blogToComment = await Blog
    .findById(request.params.id)
    .populate('user', { username: 1, name: 1 })

  const blog = blogToComment.toJSON()
  const comment = request.body
  const comments = (blog.comments || [])

  blog.comments = comments.concat(comment)

  delete blog.id
  blog.user = blog.user.id

  const result = await Blog.findByIdAndUpdate(blogToComment.id, blog, { new: true })
  if (result) response.status(200).json(result)
  else        response.status(400).json({ error: `${blog.title} doesn't exist` })
})

blogRouter.post('/', requireAuth, async (request, response) => {
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

  const blogToReturn = savedBlog.toJSON()
  const userObject = user.toJSON()
  delete userObject.blogs

  blogToReturn.user = userObject

  response.json(blogToReturn)
})

blogRouter.get('/:id', async (request, response) => {
  const blog = await Blog
    .findById(request.params.id)
    .populate('user', { username: 1, name: 1 })

  if (blog) response.json(blog)
  else      response.status(404).end()
})

blogRouter.delete('/:id', requireAuth, async (request, response) => {
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

blogRouter.put('/:id', requireAuth, async (request, response) => {
  const userId = request.userId
  const blogId = request.params.id
  const blog = await Blog
    .findById(blogId)
    // .populate({ username: 1, name: 1 })


  if (!blog) return response.status(404).json({
    error: 'Blog doesnt exists'
  })

  const originalBlog = blog.toJSON()

  // if (blog.user.toString() !== userId)
  //   return response.status(401).json({
  //     error: 'You dont have permission to modify that blog'
  //   })

  const blogToUpdate = request.body
  blogToUpdate.user = originalBlog.user

  const validationError = (new Blog(blogToUpdate)).validateSync()
  if (validationError) {
    return response.status(400).json({
      error: validationError.message
    })
  }

  const updatedBlog = await Blog
    .findByIdAndUpdate(blogId, blogToUpdate, { new: true })
    .populate('user', { username: 1, name: 1 })

  if (updatedBlog) {
    response.status(200).json(updatedBlog)
  }
  else {
    response.status(400).json({ error: `${blogToUpdate.title} doesn't exist` })
  }
})


module.exports = blogRouter