import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Workspace extends Model {
    static associate(models) {
      this.belongsTo(models.User);
      this.hasMany(models.Board);
    }
  }
  Workspace.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: "WorkspaceUnique",
      },
      access: {
        type: DataTypes.INTEGER,
        allowNull: false,
        max: 1,
        min: 1,
      },
      userId: {
        type: DataTypes.INTEGER,
        unique: "WorkspaceUnique",
        allowNull: true,
        onDelete: "CASCADE",
        references: {
          model: "Users",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Workspace",
      tableName: "Workspaces",
      underscored: true,
    }
  );
  (async () => {
    await Workspace.sync({ alter: true });
  })();
  return Workspace;
};
