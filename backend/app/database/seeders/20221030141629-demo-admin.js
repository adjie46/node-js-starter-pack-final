'use strict';

/** @type {import('sequelize-cli').Migration} */

const {
  v5: uuidv5
} = require('uuid');

const myFunction = require("../../helper/myFunction");
const config = require("../../config/config");

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("gUsers", [{
      id: uuidv5(await myFunction.randomString(10), config.nameSpace),
      adminName: "Administrator",
      adminEmail: "admin@gmail.com",
      adminPhone: "6281269494591",
      adminUsername: "admin",
      adminRole: "-1",
      adminPassword: await myFunction.encrypt("admin"),
      createdAt: new Date(),
      updatedAt: new Date(),
    }, ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('gUsers', null, {});
  }
};