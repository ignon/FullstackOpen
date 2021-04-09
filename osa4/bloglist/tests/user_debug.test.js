const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const User = require('../models/user')

beforeEach(async () => {
  await User.deleteMany({})
})

describe('root', () => {

  test('creating user', async () => {

    const usersAtStart = await helper.getUsersInDatabase()

    const newUser = {
      name: 'Arttu Mäki',
      username: 'arde21423',
      password: 'salasana'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.getUsersInDatabase()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.name)
    expect(usernames).toContain(newUser.name)
  })

  test('creating user when username missing', async () => {
    const response = await api
      .post('/api/users/')
      .send({
        username: '',
        name: 'namejkjök'
      })
      .expect(400)
      .expect('Content-Type', /application\/json/)

    console.log(response.body)
  })

  // test('creating fails if username already taken', async () => {
  //   const usersAtStart = await helper.getUsersInDatabase()

  //   const newUser = {
  //     username: 'root',
  //     name: 'root user',
  //     password: 'foobar'
  //   }

  //   const result = await api
  //     .post('/api/users')
  //     .send(newUser)
  //     .expect(400)
  //     .expect('Content-Type', /application\/json/)

  //   expect(result.body.error).toContain('`username` to be unique')

  //   const usersAtEnd = await helper.getUsersInDatabase()
  //   expect(usersAtEnd).toHaveLength(usersAtStart.length)
  // })

})

afterAll(() => {
  mongoose.connection.close()
})