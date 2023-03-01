module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('places', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      latitude: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      longitude: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      type: {
        type: Sequelize.TINYINT,
        allowNull: true
      },
      quiet: {
        type: Sequelize.BOOLEAN,
        allowNull: true
      },
      solo: {
        type: Sequelize.BOOLEAN,
        allowNull: true
      },
      gathering: {
        type: Sequelize.BOOLEAN,
        allowNull: true
      },
      wifi: {
        type: Sequelize.TINYINT,
        allowNull: true
      },
      outlet: {
        type: Sequelize.BOOLEAN,
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
    await queryInterface.dropTable('places');
  }
}