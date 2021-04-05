import { Model } from "sequelize";
import crypto from "crypto";

export default (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasOne(models.Workspace, { onDelete: "CASCATE" });
    }
  }
  User.init(
    {
      first_name: {
        type: DataTypes.STRING,
        allowNull: {
          args: false,
          msg: "Please enter your first name",
        },
        validate: {
          min: 2,
          max: 30,
        },
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          min: 0,
          max: 60,
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: {
          args: false,
          msg: "Please enter your email address",
        },
        validate: {
          isEmail: true,
          min: 4,
          max: 70,
        },
        unique: {
          args: true,
          msg: "Email already exists",
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: {
          args: false,
          msg: "Please enter your password",
        },
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
  (async () => {
    await User.sync({ alter: true });
  })();   
  return User;
};

function hashPassword(message) {
  return crypto.createHash("sha256").update(message).digest("base64");
}
