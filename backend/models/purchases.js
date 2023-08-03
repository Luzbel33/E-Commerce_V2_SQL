'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class purchases extends Model {
    static associate(models) {
      // Aquí puedes definir las asociaciones con otros modelos si es necesario
    }
  }

  purchases.init({
    user: {
      primaryKey: false,
      type: DataTypes.STRING,
    },
    title: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    total: DataTypes.INTEGER,
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    sequelize,
    modelName: 'purchases',
  });

  return purchases;
};