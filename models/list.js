import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
    class List extends Model {
        static associate(models) {
            this.belongsTo(models.Board, { foreignKey: "boardId" });
            this.hasMany(models.Card, { foreignKey: "listId" });
        }
    }
    List.init(
        {
            name: {
                type: DataTypes.STRING,
                unique: "ListUnique",
                allowNull: {
                    args: false,
                    msg: "Please enter url",
                },
            },
            order: {
                type: DataTypes.INTEGER,
                allowNull: {
                    args: false,
                    msg: "Please enter order",
                },
            },
            boardId: {
                type: DataTypes.INTEGER,
                unique: "ListUnique",
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: "List",
            tableName: "Lists",
            underscored: true,
        }
    );
    return List;
};
