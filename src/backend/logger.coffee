winston = require('winston')
winston.emitErrs = true
logger = new winston.Logger({
  transports: [
    new winston.transports.File({
      level: 'info'
      filename: 'logs/log.log'
      handleExceptions: true
      json: true
      maxsize: 5242880 #5MB
      maxFiles: 5
      colorize: false
      timestamp: true
    }),
    new winston.transports.Console({
      level: 'info'
      handleExceptions: true
      json: false
      colorize: true
    })
  ],
  exitOnError: false
})
winston.level = 'error'


module.exports = logger
module.exports.stream = {
  write: (message, encoding) ->
    logger.info(message)
}