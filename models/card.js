import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
    class Card extends Model {
        static associate(models) {
            this.belongsTo(models.List);
            this.belongsToMany(models.User, { through: models.UserCard });
        }
    }
    Card.init(
        {
            name: {
                type: DataTypes.STRING,
                unique: "nameList",
                allowNull: false,
            },
            type: {
                type: DataTypes.INTEGER,
                allowNull: {
                    args: false,
                    msg: "Please enter type",
                },
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            listId: {
                type: DataTypes.INTEGER,
                unique: "nameList",
                allowNull: false,
                onDelete: "CASCADE",
                references: {
                    model: 'Lists',
                    key: "id",
                },
            },
        },
        {
            sequelize,
            modelName: "Card",
            tableName: "Cards",
            underscored: true,
        }
    );
    (async () => {
        await Card.sync({ alter: true });
    })();
    return Card;
};