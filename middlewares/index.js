const { errorHandler } = require('./middlewares/error-handler.middleware')

const { routeNotFound } = require('./middlewares/route-not-found.middleware')

module.exports = { errorHandler, routeNotFound }
