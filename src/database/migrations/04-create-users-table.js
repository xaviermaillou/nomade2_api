module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('users', {
        email: {
          type: Sequelize.STRING(255),
          allowNull: false
        },
        uid: {
          type: Sequelize.STRING(255),
          allowNull: false,
          primaryKey: true
        },
        type: {
          type: Sequelize.STRING(255),
          allowNull: true
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
        }
      })
    },
  
    down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable('users');
    }
  }