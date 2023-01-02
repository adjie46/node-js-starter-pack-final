'use strict';

/** @type {import('sequelize-cli').Migration} */

const {
  v5: uuidv5
} = require('uuid');

const myFunction = require("../../helper/myFunction");
const config = require("../../config/config");

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("gAccesses", [{
      id: uuidv5(await myFunction.randomString(10), config.nameSpace),
      appName: "ANDROID",
      appToken: await myFunction.randomString(64),
      createdAt: new Date(),
      updatedAt: new Date(),
    }, ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('gAccesses', null, {});
  }
};