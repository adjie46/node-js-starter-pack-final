'use strict';
/** @type {import('sequelize-cli').Migration} */
var DataTypes = require("sequelize/lib/data-types");
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('gMenus', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      menuName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      menuLink: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      menuIcon: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      subMenu: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      badge: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      type: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('gMenus');
  }
};