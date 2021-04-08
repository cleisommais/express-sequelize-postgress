import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
    class Invite extends Model {
        static associate(models) {
            this.belongsTo(models.Workspace, {
                foreignKey: "workspaceId",
                allowNull: true,
            });
            this.belongsTo(models.Board, {
                foreignKey: "boardId",
                allowNull: true,
            });
        }
    }
    Invite.init(
        {
            url: {
                type: DataTypes.STRING,
                unique: "InviteUnique",
                allowNull: false,
            },
            workspaceId: {
                type: DataTypes.INTEGER,
                allowNull: true,
                unique: "InviteUnique",
            },
            boardId: {
                type: DataTypes.INTEGER,
                allowNull: true,
                unique: "InviteUnique",
            },
        },
        {
            sequelize,
            modelName: "Invite",
            tableName: "Invites",
            underscored: true,
        }
    );
    return Invite;
};
