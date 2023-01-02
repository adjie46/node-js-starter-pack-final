'use strict';
/** @type {import('sequelize-cli').Migration} */

var DataTypes = require("sequelize/lib/data-types");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('gUsers', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      adminName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      adminEmail: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      adminPhone: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      adminUsername: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      adminPassword: {
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
    await queryInterface.dropTable('gUsers');
  }
};