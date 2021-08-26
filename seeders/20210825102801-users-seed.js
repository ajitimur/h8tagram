'use strict';

const { hashPassword } = require("../helpers/bcrypt");
let dummypass = hashPassword('123')
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

     return queryInterface.bulkInsert('Users', [{
         email: 'a@mail.com',
         password: dummypass,
         username: `username`,
         createdAt: new Date(),
         updatedAt: new Date()
       }], {});


  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('Users', null, {});
     */
     return queryInterface.bulkDelete('Users', null, {});
  }
};
