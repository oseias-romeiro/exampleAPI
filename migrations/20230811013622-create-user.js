'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
      name: {type: Sequelize.STRING, allowNull: false},
      email: {type: Sequelize.STRING, allowNull: false},
      role: {type: Sequelize.ENUM('ADMIN', 'USER'), allowNull: false},
      password: {type: Sequelize.STRING, allowNull: false},
      createdAt: {type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW},
      updatedAt: {type: Sequelize.DATE, allowNull: false,defaultValue: Sequelize.NOW}
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};
