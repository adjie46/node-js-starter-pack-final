"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn("gMenus", "subMenuId", {
      type: Sequelize.UUID,
      foreignKey: true,
      references: {
        model: "gMenus",
        key: "id",
      },
      after: "subMenu"
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.removeColumn("gMenus", "subMenuId");
  },
};