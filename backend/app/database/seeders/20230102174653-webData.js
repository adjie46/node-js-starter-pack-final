'use strict';

/** @type {import('sequelize-cli').Migration} */

const {
  v5: uuidv5
} = require('uuid');

const myFunction = require("../../helper/myFunction");
const config = require("../../config/config");

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("gWebs", [{
      id: uuidv5(await myFunction.randomString(10), config.nameSpace),
      webTitle: "Default Website",
      webDescription: "Default Description",
      webAuthor: "Adjie Kurniawan",
    }, ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('gWebs', null, {});
  }
};