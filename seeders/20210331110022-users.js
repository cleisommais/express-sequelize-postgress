'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     */
    await queryInterface.bulkInsert('users', [{
      email: 'test@com.x',
      password: '123456',
      createdAt: new Date(),
      updatedAt: new Date()      
    },{
      email: 'test2@com.x2',
      password: '123123',
      createdAt: new Date(),
      updatedAt: new Date()      
    },{
      email: 'test3@com.x3',
      password: '654321',
      createdAt: new Date(),
      updatedAt: new Date()      
    }], {});

  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     */
    await queryInterface.bulkDelete('users', null, {});

  }
};
