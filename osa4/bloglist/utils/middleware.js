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
  else if (error.message) {
    logger.info(error.message)
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

module.exports = { requestLogger, errorHandler, unknownEndpoint }