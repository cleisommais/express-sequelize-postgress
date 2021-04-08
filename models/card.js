import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
    class Card extends Model {
        static associate(models) {
            this.belongsTo(models.List, { foreignKey: "listId" });
            this.belongsToMany(models.User, {
                through: models.UserCard,
                foreignKey: "cardId",
            });
            this.belongsToMany(models.Label, { through: models.LabelCard, foreignKey: "cardId" });  
            this.hasMany(models.Checklist, { foreignKey: "cardId" });
            this.hasMany(models.Activity, { foreignKey: "cardId" });   
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
            },
        },
        {
            sequelize,
            modelName: "Card",
            tableName: "Cards",
            underscored: true,
        }
    );
    return Card;
};
