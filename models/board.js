import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
    class Board extends Model {
        static associate(models) {
            this.belongsTo(models.Workspace, { foreignKey: "workspaceId" });
            this.hasMany(models.List, { foreignKey: "boardId" });
            this.hasMany(models.Invite, { foreignKey: "boardId" });            
            this.hasMany(models.Label, { foreignKey: "boardId" });    
        }
    }
    Board.init(
        {
            name: {
                type: DataTypes.STRING,
                unique: "nameCardBoard",
                allowNull: false,
            },
            access: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            workspaceId: {
                type: DataTypes.INTEGER,
                unique: "nameCardBoard",
                allowNull: false,
            },            
        },
        {
            sequelize,
            modelName: "Board",
            tableName: "Boards",
            underscored: true,
        }
    );
    return Board;
};
