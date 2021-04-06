import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
    class List extends Model {
        static associate(models) {
            this.belongsTo(models.Board);
            this.hasMany(models.Card, { onDelete: "CASCATE" });
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
                allowNull: true,
                unique: "ListUnique",
                onDelete: "CASCADE",
                references: {
                    model: "Boards",
                    key: "id",
                },
            },
        },
        {
            sequelize,
            modelName: "List",
            tableName: "Lists",
            underscored: true,
        }
    );
    (async () => {
        await List.sync({ alter: true });
    })();
    return List;
};