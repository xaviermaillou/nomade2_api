module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('imgs', {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        path: {
          type: Sequelize.STRING(255),
          allowNull: false
        },
        place_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'places',
            key: 'id'
          }
        }
      })
    },
  
    down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable('imgs');
    }
  }