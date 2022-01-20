const productsV1 = require('./products.router')
const categoriesV1 = require('./categories.router')
const wishListsV1 = require('./wishLists.router')
const cartV1 = require('./cart.router')
const loginV1 = require("./login.router")
const signUpV1 = require("./signUp.router")

module.exports = { productsV1, categoriesV1, wishListsV1, cartV1, loginV1, signUpV1}
