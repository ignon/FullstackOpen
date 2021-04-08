const Blog = require('../models/blog')

const nonExistingId = async () => {
  const blog = new Blog({author: 'Arde', title:'Arden blogi', url: 'arde.com'})
  await blog.save()
  await blog.remove()
  return blog._id.toString()
}

const getBlogsInDatabase = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  nonExistingId,
  getBlogsInDatabase
}