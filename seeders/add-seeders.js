import "regenerator-runtime/runtime";
import crypto from "crypto";

export default {
    up: async (queryInterface, Sequelize) => {
        const user = await queryInterface.bulkInsert(
            "Users",
            [
                {
                    first_name: "John",
                    last_name: "Doe",
                    email: "john@gmail.com",
                    password: hashPassword("123@456a"),
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    first_name: "Jose",
                    last_name: "santos",
                    email: "jose@gmail.com",
                    password: hashPassword("123456"),
                    created_at: new Date(),
                    updated_at: new Date(),
                },  
                {
                    first_name: "Isaac",
                    last_name: "Melo",
                    email: "isaac@gmail.com",
                    password: hashPassword("123456"),
                    created_at: new Date(),
                    updated_at: new Date(),
                },      
                {
                    first_name: "Isabella",
                    last_name: "Melo",
                    email: "isabella@gmail.com",
                    password: hashPassword("123456"),
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    first_name: "Cristina",
                    last_name: "Melo",
                    email: "cristina@gmail.com",
                    password: hashPassword("123456"),
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    first_name: "Cleison",
                    last_name: "Melo",
                    email: "cleison@gmail.com",
                    password: hashPassword("123456"),
                    created_at: new Date(),
                    updated_at: new Date(),
                },                                                                         
            ],
            {}
        );
        await queryInterface.bulkInsert(
            "Workspaces",
            [
                {
                    name: "John Doe Workspace",
                    access: 2,
                    user_id: 1,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    name: "Jose Santos Workspace",
                    access: 1,
                    user_id: 2,
                    created_at: new Date(),
                    updated_at: new Date(),
                },                
            ],
            {}
        );
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete("Users", null, {});
        await queryInterface.bulkDelete("Workspaces", null, {});
    },
};

function hashPassword(message) {
    return crypto.createHash("sha256").update(message).digest("base64");
}