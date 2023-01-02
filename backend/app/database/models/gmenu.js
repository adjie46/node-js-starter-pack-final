'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class gMenu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  gMenu.init({
    menuName: DataTypes.STRING,
    menuLink: DataTypes.STRING,
    menuIcon: DataTypes.STRING,
    subMenu: DataTypes.BOOLEAN,
    badge: DataTypes.BOOLEAN,
    status: DataTypes.BOOLEAN,
    type: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'gMenu',
  });
  return gMenu;
};