'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Workspaces', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: 'compositeIndex', 
        validate: {
          min: 4,
          max: 70,
        }
      },
      access: {
        type: Sequelize.INTEGER,
        allowNull: false,
        max: 1,
        min: 1,
      },
      user_id: {
        type: Sequelize.INTEGER,
        unique: 'compositeIndex',   
        onDelete: 'CASCADE',   
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    await queryInterface.addIndex('Workspaces', ['name', 'user_id']);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Workspaces');
  }
};