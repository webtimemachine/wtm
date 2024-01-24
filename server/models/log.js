const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database.js');

const Log = sequelize.define('Log', {
  url: {
    type: DataTypes.STRING,
    allowNull: false
  },
  browserName: {
    type: DataTypes.STRING,
  },
  browserVersion: {
    type: DataTypes.STRING,
  },
  osName: {
    type: DataTypes.STRING,
  },
  osVersion: {
    type: DataTypes.STRING,
  }
});

module.exports = Log;