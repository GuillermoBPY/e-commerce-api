const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Purchase = sequelize.define('purchase', {
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  //uderId
  //productId
});

module.exports = Purchase;
