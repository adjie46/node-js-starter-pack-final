'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class gUserHasMenu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      gUserHasMenu.belongsTo(models.gMenu, {
        foreignKey: "idMenu",
        as: "menus",
      });
      // define association here
    }
  }
  gUserHasMenu.init({
    idUser: DataTypes.STRING,
    idMenu: DataTypes.STRING,
    read: DataTypes.BOOLEAN,
    create: DataTypes.BOOLEAN,
    update: DataTypes.BOOLEAN,
    delete: DataTypes.BOOLEAN,
    print: DataTypes.BOOLEAN,
    export: DataTypes.BOOLEAN,
    order: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'gUserHasMenu',
  });
  return gUserHasMenu;
};