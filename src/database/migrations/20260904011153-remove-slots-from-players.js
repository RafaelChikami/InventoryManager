'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('players', 'slots');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn('players', 'slots', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  }
};
