import "regenerator-runtime/runtime";
import crypto from "crypto";

export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
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
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     */
    await queryInterface.bulkDelete("Users", null, {});
  },
};

function hashPassword(message) {
  return crypto.createHash("sha256").update(message).digest("base64");
}
