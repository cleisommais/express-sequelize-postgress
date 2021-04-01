'use strict';
const {
  Model
} = require('sequelize');
const User = require('./user');
module.exports = (sequelize, DataTypes, Deferrable) => {
  class Workspace extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Workspace.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: 'compositeIndex',
      validate: {
        min: 2,
        max: 70,
      }
    },
    access: {
      type: DataTypes.INTEGER,
      allowNull: false,
      max: 1,
      min: 1,
    },
    user_id: {
      type: DataTypes.INTEGER,  
      unique: 'compositeIndex',   
      references: {
        model: User,
        key: 'id'
      }
    }    
  }, {
    sequelize,
    modelName: 'Workspace',
    tableName: 'Workspaces',
    underscored: true
  });
  return Workspace;
};