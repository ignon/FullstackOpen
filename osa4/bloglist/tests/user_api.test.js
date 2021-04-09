const User = require('../models/user')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)



describe('when there is initially one user at db', () => {

  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({
      name: 'root user',
      username: 'root',
      passwordHash
    })
    await user.save()
  })

  test('creating user a', async () => {

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

    const names = usersAtEnd.map(u => u.name)
    expect(names).toContain(newUser.name)
  })

  test('creating user when username missing', async () => {
    const usersAtStart = await helper.getUsersInDatabase()

    await api
      .post('/api/users/')
      .send({
        username: '',
        name: 'namejkjök',
        password: 'passworjhkljkld'
      })
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.getUsersInDatabase()
    expect(usersAtStart).toHaveLength(usersAtEnd.length)
  })

  test('creating fails if username already taken', async () => {
    const usersAtStart = await helper.getUsersInDatabase()

    const newUser = {
      username: 'root',
      name: 'root user',
      password: 'foobar'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.getUsersInDatabase()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})


afterAll(() => {
  mongoose.connection.close()
})