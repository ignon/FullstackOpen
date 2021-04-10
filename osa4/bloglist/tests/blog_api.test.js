const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const api = supertest(app) // wraps app to superagent object
const Blog = require('../models/blog')
const testBlogs = require('./blogs_for_testing')
const helper = require('./test_helper')
const User = require('../models/user')
const bcrypt = require('bcrypt')

let initialBlogs = testBlogs.threeBlogs

let token = ''

beforeEach(async () => {
  await User.deleteMany({})

  const user = new User({
    name: 'root',
    username: 'root',
    passwordHash: await bcrypt.hash('password', 10)
  })
  await user.save()

  for(const blog of initialBlogs)
    blog.user = user.id

  await Blog.deleteMany({})
  await Blog.insertMany(initialBlogs)

  const result = await api
    .post('/api/login')
    .send({
      username: 'root',
      password: 'password'
    })

  token = 'Bearer ' + result.body.token
})

describe('testing blogs', () => {

  test('blogs are returned as json', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /json/)

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
      .set('Authorization', token)
      .send(blogToAdd)
      .expect(200)
      .expect('Content-Type', /json/)

    const blogsAtEnd = await helper.getBlogsInDatabase()
    expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1)

    const addedBlog = blogsAtEnd.find(blog => blog.title === blogToAdd.title)
    expect(addedBlog.title).toBe(blogToAdd.title)
    expect(addedBlog.author).toBe(blogToAdd.author)
    expect(addedBlog.likes).toBe(5)
  })

  test('blog cant be added without authorization', async () => {
    const blogToAdd = {
      title: 'Huzzah!',
      author: 'Toaster',
      url: 'huzzah.org.gov',
      likes: 5
    }

    await api
      .post('/api/blogs')
      //.set('Authorization', token)
      .send(blogToAdd)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.getBlogsInDatabase()
    expect(blogsAtEnd).toHaveLength(initialBlogs.length)
  })

  test('blog without author cant be added', async () => {
    const newBlog = {
      title: '',
      author: 'Toaster',
      url: 'huzzah.org.gov'
    }

    await api
      .post('/api/blogs')
      .set('Authorization', token)
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length)
  })

  test('blog can be viewed based on id', async () => {
    const blogsAtStart = await helper.getBlogsInDatabase()
    const blogToView = blogsAtStart[0]

    const result = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /json/)

    const resultBlog = result.body

    expect(typeof resultBlog.user).toBe('object')
    expect(typeof resultBlog.user.name).toBe('string')
    // skips user population
    delete resultBlog.user
    delete blogToView.user

    const processedBlogToView = JSON.parse(JSON.stringify(blogToView))
    expect(resultBlog).toEqual(processedBlogToView)
  })

  test('blog can be deleted based on id', async () => {
    const blogsAtStart = await helper.getBlogsInDatabase()
    const blogToDelete = blogsAtStart[0]
    // console.log(blogsAtStart, null, '\t')

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', token)
      .expect(204)

    const blogsAtEnd = await helper.getBlogsInDatabase()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)

    const titlesAtEnd = blogsAtEnd.map(blog => blog.title)
    expect(titlesAtEnd).not.toContain(blogToDelete.title)
  })

  test('deleting blog without authorization fails', async () => {
    const blogsAtStart = await helper.getBlogsInDatabase()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(401)

    const blogsAtEnd = await helper.getBlogsInDatabase()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)

    const titlesAtEnd = blogsAtEnd.map(blog => blog.title)
    expect(titlesAtEnd).toContain(blogToDelete.title)
  })

  test('deleting blog with made up token', async () => {
    const blogsAtStart = await helper.getBlogsInDatabase()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', 'Bearer made_up_token_jk23l41j3')
      .expect(401)

    const blogsAtEnd = await helper.getBlogsInDatabase()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)

    const titlesAtEnd = blogsAtEnd.map(blog => blog.title)
    expect(titlesAtEnd).toContain(blogToDelete.title)
  })

  test('undefined like field defaults to 0', async () => {
    const newBlog = {
      title: 'Huzzah!',
      author: 'Toaster',
      url: 'huzzah.org.gov'
    }

    await api
      .post('/api/blogs')
      .set('Authorization', token)
      .send(newBlog)
      .expect(200)
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
      .set('Authorization', token)
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
      .set('Authorization', token)
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length)
  })

  test('delete unexisting blog', async () => {
    const blogId = 'non_existing_id_34l2klj332j32l2k3jl23jk23lk'

    await api
      .delete(`/api/blogs/${blogId}`)
      .set('Authorization', token)
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
      .set('Authorization', token)
      .send(blogToModify)
      .expect(200)

    const blogsAtEnd = await helper.getBlogsInDatabase()
    const modifiedBlog = blogsAtEnd.find(blog => blog.id === blogToModify.id)
    expect(modifiedBlog).toEqual(blogToModify)
  })

  test('modifying blog without authorization fails', async () => {
    const blogsAtStart = await helper.getBlogsInDatabase()
    const blogToModify = {
      ...blogsAtStart[0],
      likes: 7,
      title: 'New modified title'
    }

    await api
      .put(`/api/blogs/${blogToModify.id}`)
      .send(blogToModify)
      .expect(401)

    const blogsAtEnd = await helper.getBlogsInDatabase()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
  })
  test('modifying unexisting blog', async () => {
    const blogsAtStart = await helper.getBlogsInDatabase()
    const blogToModify = { ...blogsAtStart[0] }
    blogToModify.id = 'unexisting_id_j43kjh4j3241jkl6h34g7f45677'

    await api
      .put(`/api/blogs/${blogToModify.id}`)
      .set('Authorization', token)
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
})