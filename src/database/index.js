const sequelize = require('./config/sequelize')
const User = require('./models/User')
const Img = require('./models/Img')
const Place = require('./models/Place')
const CoffeeshopDetail = require('./models/CoffeeshopDetail')
const PlaceUser = require('./models/PlaceUser')
const Warning = require('./models/Warning')

module.exports = { sequelize, User, Img, Place, CoffeeshopDetail, PlaceUser, Warning }