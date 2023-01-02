'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class gWeb extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  gWeb.init({
    webTitle: DataTypes.STRING,
    webDescription: DataTypes.STRING,
    webAuthor: DataTypes.STRING,
    webFavicon: DataTypes.STRING,
    webLogo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'gWeb',
  });
  return gWeb;
};