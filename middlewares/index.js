const { errorHandler } = require('./error-handler.middleware')

const { routeNotFound } = require('./route-not-found.middleware')

module.exports = { errorHandler, routeNotFound }
