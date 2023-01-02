'use strict';
/** @type {import('sequelize-cli').Migration} */
var DataTypes = require("sequelize/lib/data-types");
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('gAccesses', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      appName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      appToken: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        type: "TIMESTAMP",
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
      },
      updatedAt: {
        type: "TIMESTAMP",
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('gAccesses');
  }
};