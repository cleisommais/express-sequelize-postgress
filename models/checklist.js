import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
    class Checklist extends Model {
        static associate(models) {
            this.belongsTo(models.Card, { foreignKey: "cardId" });
        }
    }
    Checklist.init(
        {
            name: {
                type: DataTypes.STRING,
                unique: "nameCardChecklist",
                allowNull: false,
            },
            isDone: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
            cardId: {
                type: DataTypes.INTEGER,
                unique: "nameCardChecklist",
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: "Checklist",
            tableName: "Checklists",
            underscored: true,
        }
    );
    return Checklist;
};
