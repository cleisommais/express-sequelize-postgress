import "regenerator-runtime/runtime";
import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";

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
                    description:
                        "Design and define the architecure of the course",
                    list_id: 1,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    name: "Create account AWS",
                    type: 1,
                    description:
                        "Create a new free tier accout at AWS to be used on the course",
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
                    url: `http://localhost/${uuidv4()}`,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    board_id: 1,
                    url: `http://localhost/${uuidv4()}`,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    board_id: 2,
                    url: `http://localhost/${uuidv4()}`,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ],
            {}
        );
        await queryInterface.bulkInsert(
            "Labels",
            [
                {
                    board_id: 1,
                    name: "Test",
                    color: "Blue",
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    board_id: 1,
                    name: "Production",
                    color: "Green",
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    board_id: 1,
                    name: "Block",
                    color: "Yellow",
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    board_id: 2,
                    name: "Test",
                    color: "Blue",
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    board_id: 2,
                    name: "Production",
                    color: "Green",
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    board_id: 2,
                    name: "Block",
                    color: "Yellow",
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ],
            {}
        );
        await queryInterface.bulkInsert(
            "LabelsCards",
            [
                {
                    card_id: 1,
                    label_id: 1,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    card_id: 1,
                    label_id: 2,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    card_id: 1,
                    label_id: 3,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ],
            {}
        );
        await queryInterface.bulkInsert(
            "Checklists",
            [
                {
                    card_id: 1,
                    name: "Check 01",
                    is_done: false,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    card_id: 1,
                    name: "Check 02",
                    is_done: false,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    card_id: 2,
                    name: "Check 01",
                    is_done: true,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ],
            {}
        );
        await queryInterface.bulkInsert(
            "Activities",
            [
                {
                    description:
                        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
                    card_id: 1,
                    user_id: 1,
                    board_id: 1,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    description:
                        "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney.",
                    card_id: 2,
                    user_id: 1,
                    board_id: 1,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    description:
                        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
                    card_id: 1,
                    user_id: 2,
                    board_id: 1,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ],
            {}
        );
        await queryInterface.bulkInsert(
            "Attachments",
            [
                {
                    name: "File 01",
                    url: "http://localhost/folders/public/file01.pdf",
                    card_id: 1,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    name: "File 02",
                    url: "http://localhost/folders/public/file02.pdf",
                    card_id: 1,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    name: "File 01",
                    url: "http://localhost/folders/public/file01.pdf",
                    card_id: 2,
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
        await queryInterface.bulkDelete("Labels", null, {});
        await queryInterface.bulkDelete("LabelsCards", null, {});
        await queryInterface.bulkDelete("Checklists", null, {});
        await queryInterface.bulkDelete("Activities", null, {});
        await queryInterface.bulkDelete("Attachments", null, {});
    },
};

function hashPassword(message) {
    return crypto.createHash("sha256").update(message).digest("base64");
}
