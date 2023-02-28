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
    type: {
        type: DataTypes.TINYINT,
        allowNull: true
    },
    quiet: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    solo: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    gathering: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    wifi: {
        type: DataTypes.TINYINT,
        allowNull: true
    },
    outlet: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
}, {
    sequelize,
    modelName: 'Place'
})

module.exports = Place
