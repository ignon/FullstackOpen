const User = require('../models/user')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
})

describe('creating user and login', () => {

  test('creating user', async () => {
    //await helper.getBlogsInDatabase()
    // await User.find({})
    const username = 'arde'
    const password = 'password'
    const name = 'Arttu'

    const result = await api
      .post('/api/users')
      .send({
        username,
        password,
        name
      })
      .expect(200)
      .expect('Content-Type', /json/)

    const createdUser = result.body

    expect(createdUser.name).toBe(name)
    expect(createdUser.username).toBe(username)
    expect(createdUser.id).toBeDefined()

    const response = await api
      .post('/api/login')
      .send({
        username,
        password
      })
      .expect(200)
      .expect('Content-Type', /json/)

    expect(response.body.token).toBeDefined()
  })
})

afterAll(() => {
  mongoose.connection.close()
})