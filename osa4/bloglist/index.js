const http = require('http')
const app = require('./app')
const config = require('./utils/config')
const server = http.createServer(app)
const logger = require('./utils/logger')

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})