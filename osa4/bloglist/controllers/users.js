const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

const passwordMinLength = 3

userRouter.post('/', async (request, response) => {
  const body = request.body

  if (typeof body.password !== 'string' || body.password.length < passwordMinLength)
    return response.status(400).json({
      error: `Password must be at least ${passwordMinLength} characters long: ${body.password}`
    })

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  // console.log('----------------- NEW USER --------------------\n', body)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash
  })

  const savedUser = await user.save()
  response.json(savedUser)
})

userRouter.get('/', async (request, response) => {
  const users = await User
    .find({})
    .populate('blogs', { user: 0 })

  response.json(users.map(u => u.toJSON()))
})

module.exports = userRouter