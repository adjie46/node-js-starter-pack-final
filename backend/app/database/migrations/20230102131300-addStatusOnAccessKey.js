"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn("gAccesses", "status", {
      type: Sequelize.BOOLEAN,
      after: "appToken"
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.removeColumn("gAccesses", "status");
  },
};