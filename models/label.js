import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
    class Label extends Model {
        static associate(models) {
            this.belongsTo(models.Board, {
                foreignKey: "boardId",
                allowNull: true,
            });
            this.belongsToMany(models.Card, {
                through: models.LabelCard,
                foreignKey: "labelId",
            });
        }
    }
    Label.init(
        {
            name: {
                type: DataTypes.STRING,
                unique: "uniqueLabel",
                allowNull: false,
            },
            color: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            boardId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                unique: "uniqueLabel",
            },
        },
        {
            sequelize,
            modelName: "Label",
            tableName: "Labels",
            underscored: true,
        }
    );
    return Label;
};
