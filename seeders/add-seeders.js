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
        await queryInterface.bulkInsert(
            "Boards",
            [
                {
                    name: "Apigee Udemy course",
                    access: 1,
                    workspace_id: 1,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    name: "Express + Sequelize + Postgres Udemy course",
                    access: 1,
                    workspace_id: 1,
                    created_at: new Date(),
                    updated_at: new Date(),
                },                                
            ],
            {}
        );  
        await queryInterface.bulkInsert(
            "Lists",
            [
                {
                    name: "Todo",
                    order: 0,
                    board_id: 1,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    name: "Doing",
                    order: 1,
                    board_id: 1,
                    created_at: new Date(),
                    updated_at: new Date(),
                },   
                {
                    name: "Done",
                    order: 2,
                    board_id: 1,
                    created_at: new Date(),
                    updated_at: new Date(),
                },                             
            ],
            {}
        );   
        await queryInterface.bulkInsert(
            "Cards",
            [
                {
                    name: "Create the architecture",
                    type: 1,
                    description: "Design and define the architecure of the course",
                    list_id: 1,
                    created_at: new Date(),
                    updated_at: new Date(),
                },  
                {
                    name: "Create account AWS",
                    type: 1,
                    description: "Create a new free tier accout at AWS to be used on the course",
                    list_id: 3,
                    created_at: new Date(),
                    updated_at: new Date(),
                },                                           
            ],
            {}
        );   
        await queryInterface.bulkInsert(
            "UsersCards",
            [
                {
                    card_id: 1,
                    user_id: 3,
                    created_at: new Date(),
                    updated_at: new Date(),
                }, 
                {
                    card_id: 1,
                    user_id: 4,
                    created_at: new Date(),
                    updated_at: new Date(),
                },                 
                {
                    card_id: 2,
                    user_id: 3,
                    created_at: new Date(),
                    updated_at: new Date(),
                },                                           
            ],
            {}
        );  
        await queryInterface.bulkInsert(
            "Invites",
            [
                {
                    workspace_id: 1,
                    url: "http://test.com/xpofsfisaoifaljk",
                    created_at: new Date(),
                    updated_at: new Date(),
                }, 
                {
                    board_id: 1,
                    url: "http://test.com/kljfosijlkmmlkoiuuf",
                    created_at: new Date(),
                    updated_at: new Date(),
                },                 
                {
                    board_id: 2,
                    url: "http://test.com/ytutqurmoiuosvxcvwe4",
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
        await queryInterface.bulkDelete("Boards", null, {});
        await queryInterface.bulkDelete("Lists", null, {});
        await queryInterface.bulkDelete("Cards", null, {});
        await queryInterface.bulkDelete("UsersCards", null, {});
        await queryInterface.bulkDelete("Invites", null, {});
    },
};

function hashPassword(message) {
    return crypto.createHash("sha256").update(message).digest("base64");
}