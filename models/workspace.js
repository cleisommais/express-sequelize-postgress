import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Workspace extends Model {
    static associate(models) {
      this.belongsTo(models.User);
    }
  }
  Workspace.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: "WorkspaceUnique",
        validate: {
          min: 2,
          max: 70,
        },
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
    await Workspace.sync({ forse: true });
  })();
  return Workspace;
};
