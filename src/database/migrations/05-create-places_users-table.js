module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('places_users', {
        place_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'places',
                key: 'id'
            }
        },
        user_uid: {
            type: Sequelize.STRING,
            allowNull: false,
            references: {
                model: 'users',
                key: 'uid'
            }
        },
        liked: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        },
        notes: {
            type: Sequelize.STRING,
            allowNull: false
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
      await queryInterface.dropTable('places_users');
    }
  }