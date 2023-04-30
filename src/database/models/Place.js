const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/sequelize')

class Place extends Model {}

Place.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    latitude: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    longitude: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true
    },
    type: {
        type: DataTypes.TINYINT,
        allowNull: true
    },
    quiet: {
        type: DataTypes.TINYINT,
        allowNull: true
    },
    wifi: {
        type: DataTypes.TINYINT,
        allowNull: true
    },
    outlet: {
        type: DataTypes.TINYINT,
        allowNull: true
    },
    seats: {
        type: DataTypes.TINYINT,
        allowNull: true
    },
}, {
    sequelize,
    modelName: 'Place',
    tableName: 'places'
})

module.exports = Place
