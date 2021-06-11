const { errorHandler } = require('./error-handler.middleware')

const { routeNotFound } = require('./route-not-found.middleware')
const { auth } = require('./verifyToken')

module.exports = { errorHandler, routeNotFound, auth }
