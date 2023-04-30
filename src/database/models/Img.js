const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/sequelize')
const Place = require('./Place')

class Img extends Model {}

Img.init({
    path: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Img',
    tableName: 'imgs'
})

Img.belongsTo(Place)
Place.hasMany(Img)

module.exports = Img
