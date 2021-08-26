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
        contentUrl: `https://mymodernmet.com/wp/wp-content/uploads/2020/02/Landscape-Photographer-of-the-Year-Sander-Grefte.jpg`,
        title: `Pink Landscape`,
        caption: `This is a pink landscape`,
        postDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        UserId: 1
      },
      {
        contentUrl: `https://post.healthline.com/wp-content/uploads/2020/07/pizza-beer-1200x628-facebook-1200x628.jpg`,
        title: `Pizza`,
        caption: `My favourite pizza`,
        postDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        UserId: 1
      }
    ]



     return queryInterface.bulkInsert('Posts', data, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('Posts', null, {});
     */
     return queryInterface.bulkDelete('Posts', null, {});
  }
};
