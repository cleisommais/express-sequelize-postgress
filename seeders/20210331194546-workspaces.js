'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:*/
     await queryInterface.bulkInsert('workspaces', [{
        name: 'Cleison',
        access: 1,
        createdAt: new Date(),
        updatedAt: new Date()            
      }], {});    
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:*/
      await queryInterface.bulkDelete('workspaces', null, {});
     
  }
};
