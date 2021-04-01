'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Workspaces', [{
      name: 'John Doe Workspace',
      access: 2,
      user_id: 1,
      created_at: new Date(),
      updated_at: new Date()      
    }], {});

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Workspaces', null, {});
  }
};
