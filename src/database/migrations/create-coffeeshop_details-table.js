module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('imgs', {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        gluten_free_food: {
          type: Sequelize.BOOLEAN,
          allowNull: true
        },
        vegetal_milk: {
            type: Sequelize.BOOLEAN,
            allowNull: true
        },
        vegan_food: {
            type: Sequelize.BOOLEAN,
            allowNull: true
        },
        decaf: {
            type: Sequelize.BOOLEAN,
            allowNull: true
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