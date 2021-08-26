'use strict';

// const { DataTypes } = require("sequelize/types");
// const { sequelize } = require("../models");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.addColumn(`Posts`, `UserId`, {
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: 'Users'
        },
        Key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    })
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface.removeColumn('Posts', 'UserId', { /* query options */ });
  }
};
