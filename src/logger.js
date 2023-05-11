const winston = require('winston');

// Create a new logger instance
const logger = winston.createLogger({
  level: 'info', // Specify the minimum log level
  format: winston.format.json(), // Specify the log format
  transports: [
    new winston.transports.Console(), // Output logs to the console
  ]
});

module.exports = logger;
