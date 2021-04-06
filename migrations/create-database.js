import "regenerator-runtime/runtime";

export default {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("Users", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            first_name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            last_name: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
        await queryInterface.addIndex("Users", ["email"]);
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
        await queryInterface.createTable("Subscriptions", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            type: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            price: {
                type: Sequelize.DOUBLE,
                allowNull: false,
            },
            card_number: {
                type: Sequelize.BIGINT,
                allowNull: false,
            },
            card_expiration_year: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            card_expiration_month: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            security_code: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            user_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                unique: true,
                onDelete: "CASCADE",
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
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("Users");
        await queryInterface.dropTable("Workspaces");
        await queryInterface.dropTable("Subscriptions");
    },
};