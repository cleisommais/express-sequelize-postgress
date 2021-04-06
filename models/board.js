import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
    class Board extends Model {
        static associate(models) {
            this.belongsTo(models.Workspace);
            this.hasMany(models.List);
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
                onDelete: "CASCADE",
                references: {
                    model: "Workspaces",
                    key: "id",
                },
            },
        },
        {
            sequelize,
            modelName: "Board",
            tableName: "Boards",
            underscored: true,
        }
    );
    (async () => {
        await Board.sync({ alter: true });
    })();
    return Board;
};
