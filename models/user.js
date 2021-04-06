import { Model } from "sequelize";
import crypto from "crypto";

export default (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasOne(models.Workspace, { onDelete: "CASCATE" });
      this.hasOne(models.Subscription, { onDelete: "CASCATE" });
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
  (async () => {
    await User.sync({ alter: true });
  })();   
  return User;
};

function hashPassword(message) {
  return crypto.createHash("sha256").update(message).digest("base64");
}
