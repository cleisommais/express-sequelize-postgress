import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
    class Attachment extends Model {
        static associate(models) {
            this.belongsTo(models.Card, { foreignKey: "cardId" });
        }
    }
    Attachment.init(
        {
            name: {
                type: DataTypes.STRING,
                unique: 'nameCardAttachment',
                allowNull: false,
            },	
            url: {
                type: DataTypes.STRING,
                allowNull: false,
            },				
            cardId: {
                type: DataTypes.INTEGER,
				unique: 'nameCardAttachment',
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: "Attachment",
            tableName: "Attachments",
            underscored: true,
        }
    );
    return Attachment;
};