'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    let data = [
      {
        name: `landscape`,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: `food`,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]


     return queryInterface.bulkInsert('Hashtags', data, {});

  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     return queryInterface.bulkDelete('Hashtags', null, {})
  }
};
