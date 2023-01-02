'use strict';
/** @type {import('sequelize-cli').Migration} */
var DataTypes = require("sequelize/lib/data-types");
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('gUserHasMenus', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      idUser: {
        type: Sequelize.UUID,
        foreignKey: true,
        references: {
          model: "gUsers",
          key: "id",
        },
      },
      idMenu: {
        type: Sequelize.UUID,
        foreignKey: true,
        references: {
          model: "gMenus",
          key: "id",
        },
      },
      read: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
      },
      create: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
      },
      update: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
      },
      delete: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
      },
      print: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
      },
      export: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
      },
      order: {
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
    await queryInterface.dropTable('gUserHasMenus');
  }
};