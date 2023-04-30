const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/sequelize')
const Place = require('./Place')
const User = require('./User')

class Warning extends Model {}

Warning.init({
    place_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'places',
            key: 'id'
        }
    },
    user_uid: {
        type: DataTypes.STRING,
        primaryKey: true,
        references: {
            model: 'users',
            key: 'uid'
        }
    },
    message: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    sequelize,
    modelName: 'Warning',
    tableName: 'warnings'
})

module.exports = Warning
