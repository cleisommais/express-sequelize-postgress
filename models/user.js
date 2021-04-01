

'use strict';
const crypto = require('crypto')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 2,
        max: 30
      }
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 0,
        max: 60
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
        min: 4,
        max: 70
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        const hash = hashPassword(value);
        this.setDataValue('password', hash);
      },      
      validate: {
        min: 4,
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'Users',
    underscored: true,
    indexes: [{ unique: true, fields: ['email'] }],
  });
  return User;
};

function hashPassword(message) {
  return crypto.createHash('sha256').update(message).digest('base64')
}