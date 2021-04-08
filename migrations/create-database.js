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
        await queryInterface.createTable(
            "Boards",
            {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER,
                },
                name: {
                    type: Sequelize.STRING,
                    unique: "uniqueWorkspace",
                    allowNull: false,
                },
                access: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                workspace_id: {
                    type: Sequelize.INTEGER,
                    unique: "uniqueWorkspace",
                    allowNull: false,
                    onDelete: "CASCADE",
                    references: {
                        model: "Workspaces",
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
                        fields: ["name", "workspace_id"],
                    },
                },
            }
        );
        await queryInterface.createTable(
            "Lists",
            {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER,
                },
                name: {
                    type: Sequelize.STRING,
                    unique: "ListUnique",
                    allowNull: false,
                },
                order: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                board_id: {
                    type: Sequelize.INTEGER,
                    unique: "ListUnique",
                    allowNull: false,
                    onDelete: "CASCADE",
                    references: {
                        model: "Boards",
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
                        fields: ["name", "board_id"],
                    },
                },
            }
        );
        await queryInterface.createTable(
            "Cards",
            {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER,
                },
                name: {
                    type: Sequelize.STRING,
                    unique: "nameList",
                    allowNull: false,
                },
                type: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                description: {
                    type: Sequelize.TEXT,
                    allowNull: false,
                },
                list_id: {
                    type: Sequelize.INTEGER,
                    unique: "nameList",
                    allowNull: false,
                    onDelete: "CASCADE",
                    references: {
                        model: "Lists",
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
                        fields: ["name", "list_id"],
                    },
                },
            }
        );
        await queryInterface.createTable(
            "UsersCards",
            {
                card_id: {
                    type: Sequelize.INTEGER,
                    unique: "UserCardUnique",
                    allowNull: false,
                    onDelete: "CASCADE",
                    references: {
                        model: "Cards",
                        key: "id",
                    },
                },
                user_id: {
                    type: Sequelize.INTEGER,
                    unique: "UserCardUnique",
                    allowNull: false,
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
            },
            {
                uniqueKeys: {
                    unique_tag: {
                        customIndex: true,
                        fields: ["card_id", "user_id"],
                    },
                },
            }
        );
        await queryInterface.createTable(
            "Invites",
            {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER,
                },
                url: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                board_id: {
                    type: Sequelize.INTEGER,
                    unique: "inviteUnique",
                    allowNull: true,
                    onDelete: "CASCADE",
                    references: {
                        model: "Boards",
                        key: "id",
                    },
                },
                workspace_id: {
                    type: Sequelize.INTEGER,
                    unique: "inviteUnique",
                    allowNull: true,
                    onDelete: "CASCADE",
                    references: {
                        model: "Workspaces",
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
                        fields: ["board_id", "workspace_id", "url"],
                    },
                },
            }
        );
        await queryInterface.createTable(
            "Labels",
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
                    unique: "uniqueLabel",
                },
                color: {
                    type: Sequelize.STRING,
                    allowNull: false,
                    unique: "uniqueLabel",
                },                
                board_id: {
                    type: Sequelize.INTEGER,
                    unique: "uniqueLabel",
                    allowNull: true,
                    onDelete: "CASCADE",
                    references: {
                        model: "Boards",
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
                        fields: ["board_id", "name"],
                    },
                },
            }
        );
        await queryInterface.createTable(
            "LabelsCards",
            {
                card_id: {
                    type: Sequelize.INTEGER,
                    unique: "LabelsCardsUnique",
                    allowNull: false,
                    onDelete: "CASCADE",
                    references: {
                        model: "Cards",
                        key: "id",
                    },
                },
                label_id: {
                    type: Sequelize.INTEGER,
                    unique: "LabelsCardsUnique",
                    allowNull: false,
                    onDelete: "CASCADE",
                    references: {
                        model: "Labels",
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
                        fields: ["card_id", "label_id"],
                    },
                },
            }
        );
        await queryInterface.createTable(
            "Checklists",
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
                    unique: "uniqueLabel",
                }, 
                is_done: {
                    type: Sequelize.BOOLEAN,
                    allowNull: false,
                },                              
                card_id: {
                    type: Sequelize.INTEGER,
                    unique: "uniqueLabel",
                    allowNull: true,
                    onDelete: "CASCADE",
                    references: {
                        model: "Cards",
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
                        fields: ["card_id", "name"],
                    },
                },
            }
        );
        await queryInterface.createTable(
            "Activities",
            {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER,
                },
                description: {
                    type: Sequelize.TEXT,
                    allowNull: false,
                },                              
                card_id: {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                    onDelete: "CASCADE",
                    references: {
                        model: "Cards",
                        key: "id",
                    },
                },
                user_id: {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                    onDelete: "CASCADE",
                    references: {
                        model: "Users",
                        key: "id",
                    },
                },    
                board_id: {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                    onDelete: "CASCADE",
                    references: {
                        model: "Boards",
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
        );
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("Activities");
        await queryInterface.dropTable("Checklists");
        await queryInterface.dropTable("LabelsCards");
        await queryInterface.dropTable("Labels");
        await queryInterface.dropTable("Invites");
        await queryInterface.dropTable("UsersCards");
        await queryInterface.dropTable("Cards");
        await queryInterface.dropTable("Lists");
        await queryInterface.dropTable("Boards");
        await queryInterface.dropTable("Subscriptions");
        await queryInterface.dropTable("Workspaces");
        await queryInterface.dropTable("Users");
    },
};
