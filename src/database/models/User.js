const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/sequelize')

class User extends Model {}

User.init({
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    uid: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    type: {
        type: DataTypes.STRING,
        allowNull: true
    },
}, {
    sequelize,
    modelName: 'User',
    tableName: 'users'
})

module.exports = User
