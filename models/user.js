import { Model } from "sequelize";
import crypto from "crypto";

export default (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasOne(models.Workspace, { foreignKey: "userId" });
      this.hasOne(models.Subscription, { foreignKey: "userId" });
      this.belongsToMany(models.Card, { through: models.UserCard, foreignKey: "userId" });
      this.hasMany(models.Activity, { foreignKey: "userId" });   
    }
  }
  User.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
        unique: {
          args: true,
          msg: "Email already exists",
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
          const hash = hashPassword(value);
          this.setDataValue("password", hash);
        },
        validate: {
          min: 4,
        },
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "Users",
      underscored: true,
    }
  );  
  return User;
};

function hashPassword(message) {
  return crypto.createHash("sha256").update(message).digest("base64");
}
