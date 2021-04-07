import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
    class UserCard extends Model {
        static associate(models) {}
    }
    UserCard.init(
        {
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                unique: "UserCardUnique",
            },
            cardId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                unique: "UserCardUnique",
            },
        },
        {
            sequelize,
            modelName: "UserCard",
            tableName: "UsersCards",
            underscored: true,
        }
    );
    return UserCard;
};
