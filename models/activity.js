import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
    class Activity extends Model {
        static associate(models) {
            this.belongsTo(models.Card, { foreignKey: "cardId" });
            this.belongsTo(models.User, { foreignKey: "userId" });
            this.belongsTo(models.Board, { foreignKey: "boardId" });
        }
    }
    Activity.init(
        {
            description: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            cardId: {
                type: DataTypes.INTEGER,
                unique: "nameCardActivity",
                allowNull: false,
            },
            userId: {
                type: DataTypes.INTEGER,
                unique: "nameCardActivity",
                allowNull: false,
            },
            boardId: {
                type: DataTypes.INTEGER,
                unique: "nameCardActivity",
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: "Activity",
            tableName: "Activities",
            underscored: true,
        }
    );
    return Activity;
};
