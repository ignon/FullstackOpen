const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const api = supertest(app) // wraps app to superagent object
const Blog = require('../models/blog')
const testBlogs = require('./blogs_for_testing')
const helper = require('./test_helper')
// const { request } = require('express')

const initialBlogs = testBlogs.threeBlogs

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(initialBlogs)
})


test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length)
})

test('a specific blog is returned', async () => {
  const response = await api.get('/api/blogs')
  const contents = response.body.map(blog => blog.title)
  expect(contents).toContain('Based Cooking')
})

test('object has field "id", not "_id" ', async () => {
  const response = await api.get('/api/blogs')
  const blogs = response.body

  expect(blogs).toHaveLength(initialBlogs.length)

  for(const blog of blogs)
    expect(blog.id).toBeDefined()
})

test('blog can be added', async () => {
  const blogToAdd = {
    title: 'Huzzah!',
    author: 'Toaster',
    url: 'huzzah.org.gov',
    likes: 5
  }

  await api
    .post('/api/blogs')
    .send(blogToAdd)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.getBlogsInDatabase()
  expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1)

  const addedBlog = blogsAtEnd.find(blog => blog.title === blogToAdd.title)
  expect(addedBlog.title).toBe(blogToAdd.title)
  expect(addedBlog.author).toBe(blogToAdd.author)
  expect(addedBlog.likes).toBe(5)
})

test('blog without author cant be added', async () => {
  const newBlog = {
    title: '',
    author: 'Toaster',
    url: 'huzzah.org.gov'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length)
})

test('blog can be viewed based on id', async () => {
  const blogsAtStart = await helper.getBlogsInDatabase()
  const blogToView = blogsAtStart[0]

  const resultBlog = await api
    .get(`/api/blogs/${blogToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const processedBlogToView = JSON.parse(JSON.stringify(blogToView))
  expect(resultBlog.body).toEqual(processedBlogToView)
})

test('blog can be deleted based on id', async () => {
  const blogsAtStart = await helper.getBlogsInDatabase()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await helper.getBlogsInDatabase()
  expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)

  const titlesAtEnd = blogsAtEnd.map(blog => blog.title)
  expect(titlesAtEnd).not.toContain(blogToDelete.title)
})

test('undefined like field defaults to 0', async () => {
  const newBlog = {
    title: 'Huzzah!',
    author: 'Toaster',
    url: 'huzzah.org.gov'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.getBlogsInDatabase()
  const addedBlog = blogsAtEnd.find(blog => blog.title === newBlog.title)
  expect(addedBlog.likes).toEqual(0)
})

test('blog without title cant be added', async () => {
  const newBlog = {
    title: '',
    author: 'Toaster',
    url: 'huzzah.org.gov'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length)
})

test('blog without url cant be added', async () => {
  const newBlog = {
    title: 'Huzzah!',
    author: 'Toaster',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length)
})

test('delete blog', async () => {
  const blogsAtStart = await helper.getBlogsInDatabase()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await helper.getBlogsInDatabase()
  expect(blogsAtEnd).toHaveLength(initialBlogs.length - 1)
})

test('delete unexisting blog', async () => {
  const blogId = 'non_existing_id_34l2klj332j32l2k3jl23jk23lk'

  await api
    .delete(`/api/blogs/${blogId}`)
    .expect(400)

  const blogsAtEnd = await helper.getBlogsInDatabase()
  expect(blogsAtEnd).toHaveLength(initialBlogs.length)
})

test('modifying blog', async () => {
  const blogsAtStart = await helper.getBlogsInDatabase()
  const blogToModify = {
    ...blogsAtStart[0],
    likes: 7,
    title: 'New modified title'
  }

  await api
    .put(`/api/blogs/${blogToModify.id}`)
    .send(blogToModify)
    .expect(200)

  const blogsAtEnd = await helper.getBlogsInDatabase()
  const modifiedBlog = blogsAtEnd.find(blog => blog.id === blogToModify.id)
  expect(modifiedBlog).toEqual(blogToModify)
})

test('modifying unexisting blog blog', async () => {
  const blogsAtStart = await helper.getBlogsInDatabase()
  const blogToModify = {...blogsAtStart[0]}
  blogToModify.id = 'unexisting_id_j43kjh4j3241jkl6h34g7f45677'

  await api
    .put(`/api/blogs/${blogToModify.id}`)
    .send(blogToModify)
    .expect(400)

  const blogsAtEnd = await helper.getBlogsInDatabase()
  const modifiedBlog = blogsAtEnd.find(blog => blog.id === blogToModify.id)
  expect(modifiedBlog).not.toBeDefined()
  expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
})

afterAll(() => {
  mongoose.connection.close()
})