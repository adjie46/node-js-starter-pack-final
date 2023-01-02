'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class gLog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  gLog.init({
    log: DataTypes.TEXT,
    idUser: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'gLog',
  });
  return gLog;
};