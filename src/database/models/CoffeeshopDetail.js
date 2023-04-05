const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/sequelize')
const Place = require('./Place')

class CoffeeshopDetail extends Model {}

CoffeeshopDetail.init({
    gluten_free_food: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    vegetal_milk: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    vegan_food: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    decaf: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
}, {
    sequelize,
    modelName: 'CoffeeshopDetail',
    tableName: 'coffeeshop_details'
})

CoffeeshopDetail.belongsTo(Place)

module.exports = CoffeeshopDetail
