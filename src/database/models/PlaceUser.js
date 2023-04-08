const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/sequelize')
const Place = require('./Place')
const User = require('./User')

class PlaceUser extends Model {}

PlaceUser.init({
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
    liked: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    }
}, {
    sequelize,
    modelName: 'PlaceUser',
    tableName: 'places_users'
})

module.exports = PlaceUser
