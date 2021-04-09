const User = require('../models/user')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)



beforeEach(async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({
    name: 'root user4',
    username: 'root',
    passwordHash
  })
  await user.save()
})

describe('when there is initially one user at db', () => {

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

    const names = usersAtEnd.map(u => u.name)
    expect(names).toContain(newUser.name)
  })

  test('creating user without password fails', async () => {
    const usersAtStart = await helper.getUsersInDatabase()

    const newUser = {
      name: 'Arttu',
      username: 'arde21423'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.getUsersInDatabase()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)

    const names = usersAtEnd.map(u => u.name)
    expect(names).not.toContain(newUser.name)

    expect(result.body.error).toMatch(/password must be at least.*characters long/i)
  })

  []

  test('creating user without password fails', async () => {
    const usersAtStart = await helper.getUsersInDatabase()

    const newUser = {
      name: 'Arttu',
      username: 'arde21423',
      password: 'mo'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.getUsersInDatabase()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)

    const names = usersAtEnd.map(u => u.name)
    expect(names).not.toContain(newUser.name)

    expect(result.body.error).toMatch(/password must be at least.*characters long/i)
  })

  test('creating user without name fails', async () => {
    const usersAtStart = await helper.getUsersInDatabase()

    const newUser = {
      username: 'datakonna',
      password: 'password'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.getUsersInDatabase()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)

    const names = usersAtEnd.map(u => u.name)
    expect(names).not.toContain(newUser.name)

    expect(result.body.error).toMatch(/name.*required/i)
  })

  test('creating user when username missing', async () => {
    const usersAtStart = await helper.getUsersInDatabase()

    const result = await api
      .post('/api/users/')
      .send({
        username: '',
        name: 'datakonna',
        password: 'password'
      })
      .expect(400)
      .expect('Content-Type', /json/)

    expect(result.body.error).toMatch(/username.*required/)

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

    expect(result.body.error).toMatch(/username.*unique/)

    const usersAtEnd = await helper.getUsersInDatabase()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})


afterAll(async () => {
  mongoose.connection.close()
})


// const expectResponseTo = async (method, url, data, expectations) => {
//   const { dbSizeDelta, httpStatus, contentType, errorMessage } = expectations

//   const usersAtStart = await helper.getUsersInDatabase()

//   const result =
//     method(url)
//       .send(data)
//       .expect(httpStatus)
//       .expect('Content-Type', contentType)


//   const usersAtEnd = await helper.getUsersInDatabase()
//   expect(usersAtEnd).toHaveLength(usersAtStart.length + dbSizeDelta)

//   for(const substring of errorMessage) {
//     expect(result.body.error).toContain(substring)
//   }
//   return result
// }