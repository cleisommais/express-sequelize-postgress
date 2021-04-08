import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
    class LabelCard extends Model {
        static associate(models) {}
    }
    LabelCard.init(
        {
            labelId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                unique: "LabelCardUnique",
            },
            cardId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                unique: "LabelCardUnique",
            },
        },
        {
            sequelize,
            modelName: "LabelCard",
            tableName: "LabelCards",
            underscored: true,
        }
    );
    return LabelCard;
};
