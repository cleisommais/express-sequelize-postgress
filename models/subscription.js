import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
    class Subscription extends Model {
        static associate(models) {
            this.belongsTo(models.User, { foreignKey: "userId" });
        }
    }
    Subscription.init(
        {
            type: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            price: {
                type: DataTypes.DOUBLE,
                allowNull: false,
                validate: {
                    isDecimal: true,
                },
            },
            cardNumber: {
                type: DataTypes.BIGINT,
                allowNull: false,
                validate: {
                    isCreditCard: true,
                },
            },
            cardExpirationMonth: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    isNumeric: true,
                },
            },
            cardExpirationYear: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    isNumeric: true,
                },
            },
            securityCode: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    isNumeric: true,
                },
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                unique: {
                    args: true,
                    msg: "Only one subscription per user",
                },
            },
        },
        {
            sequelize,
            modelName: "Subscription",
            tableName: "Subscriptions",
            underscored: true,
        }
    );
    return Subscription;
};
