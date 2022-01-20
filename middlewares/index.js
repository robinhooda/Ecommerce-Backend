const { errorHandler } = require('./error-handler.middleware')

const { routeNotFound } = require('./route-not-found.middleware')
const { auth } = require('./verifyToken.middleware')

module.exports = { errorHandler, routeNotFound, auth }
