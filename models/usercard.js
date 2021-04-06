import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
    class UserCard extends Model {
        static associate(models) {
           
        }
    }
    UserCard.init(
        {
            userId: {
                type: DataTypes.INTEGER,
                unique: "UserCardUnique",
                allowNull: false,
                onDelete: "CASCADE",
                references: {
                    model: "Users",
                    key: "id",
                },
            },
            cardId: {
                type: DataTypes.INTEGER,
                unique: "UserCardUnique",
                allowNull: false,
                onDelete: "CASCADE",
                references: {
                    model: "Cards",
                    key: "id",
                },
            },			
        },
        {
            sequelize,
            modelName: "UserCard",
            tableName: "UsersCards",
            underscored: true,
        }
    );
    (async () => {
        await UserCard.sync({ alter: true });
    })();
    return UserCard;
};