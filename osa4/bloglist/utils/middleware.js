const jwt = require('jsonwebtoken')
const logger = require('./logger')
const morgan = require('morgan')
morgan.token('res_body', function (req, res) { return JSON.stringify(req.body) })

const requestLogger = (request, response, next) => {
  return morgan(':method :url :status - :res_body - :response-time ms')
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}


const errorHandler = (error, request, response, next) => {
  logger.info('Error handler: ', error.message)

  if (error.name === 'CastError') {
    return response.status(400).json({ error: 'malformatted id' })
  }
  else if (error.name === 'ValidationError') {
    logger.info(error.message)
    return response.status(400).json({ error: error.message })
  }
  else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid or missing token'
    })
  }
  else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({
      error: 'token expired'
    })
  }
  else if (error.message) {
    logger.info(error.message)
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

const tokenExtractor = (request, response, next) => {
  const auth = request.get('authorization')
  if (auth && auth.toLowerCase().startsWith('bearer')) {
    const token = auth.substring(7)
    const decodedToken = jwt.verify(token, process.env.SECRET)

    request.userId = decodedToken.id
  }

  next()
}

module.exports = {
  requestLogger,
  errorHandler,
  unknownEndpoint,
  tokenExtractor
}