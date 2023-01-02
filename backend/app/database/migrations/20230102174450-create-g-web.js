'use strict';
/** @type {import('sequelize-cli').Migration} */
var DataTypes = require("sequelize/lib/data-types");
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('gWebs', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      webTitle: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      webDescription: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      webAuthor: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      webFavicon: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: "favicon.png"
      },
      webLogo: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: "logo.png"
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
    await queryInterface.dropTable('gWebs');
  }
};