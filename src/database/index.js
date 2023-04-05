const sequelize = require('./config/sequelize')
const Img = require('./models/Img')
const Place = require('./models/Place')
const CoffeeshopDetail = require('./models/CoffeeshopDetail')

module.exports = { sequelize, Img, Place, CoffeeshopDetail }