'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class gSubMenu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  gSubMenu.init({
    idMenu: DataTypes.STRING,
    menuLink: DataTypes.STRING,
    menuName: DataTypes.STRING,
    menuIcon: DataTypes.STRING,
    subMenu: DataTypes.BOOLEAN,
    badge: DataTypes.BOOLEAN,
    status: DataTypes.BOOLEAN,
    type: DataTypes.INTEGER,
    order: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'gSubMenu',
  });
  return gSubMenu;
};