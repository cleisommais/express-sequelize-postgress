import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
    class Workspace extends Model {
        static associate(models) {
            this.belongsTo(models.User, { foreignKey: "userId" });
            this.hasMany(models.Board, { foreignKey: "workspaceId" });
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
            },
        },
        {
            sequelize,
            modelName: "Workspace",
            tableName: "Workspaces",
            underscored: true,
        }
    );
    return Workspace;
};
