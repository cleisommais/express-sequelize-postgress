import "regenerator-runtime/runtime";

export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "Workspaces",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: "uniqueWorkspace",
          validate: {
            min: 4,
            max: 70,
          },
        },
        access: {
          type: Sequelize.INTEGER,
          allowNull: false,
          max: 1,
          min: 1,
        },
        user_id: {
          type: Sequelize.INTEGER,
          unique: "uniqueWorkspace",
          onDelete: "CASCADE",
          allowNull: false,
          references: {
            model: "Users",
            key: "id",
          },
        },
        created_at: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updated_at: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      },
      {
        uniqueKeys: {
          unique_tag: {
            customIndex: true,
            fields: ["name", "user_id"],
          },
        },
      }
    );
    await queryInterface.addIndex("Workspaces", ["name", "user_id"]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Workspaces");
  },
};
