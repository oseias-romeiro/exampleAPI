'use strict';
const bcrypt = require('bcrypt');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const users = [
      {
        id: 1,
        name: "admin",
        email: "admin@email.com",
        role: "ADMIN",
        password: await bcrypt.hash('admin', 10),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: "jhon",
        email: "jhon@email.com",
        role: "USER",
        password: await bcrypt.hash('jhon', 10),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        name: "marie",
        email: "marie@email.com",
        role: "USER",
        password: await bcrypt.hash('marie', 10),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
    await queryInterface.bulkInsert('Users', users, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
