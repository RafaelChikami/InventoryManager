'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('players', 'email', {
      type: Sequelize.STRING,
      allowNull: false
    });

    await queryInterface.addColumn('players', 'password', {
      type: Sequelize.STRING,
      allowNull: false
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('players', 'email');
    await queryInterface.removeColumn('players', 'password');
  }
};
