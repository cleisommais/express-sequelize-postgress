import "regenerator-runtime/runtime";
import request from "supertest";
const app = require("../app").default;

describe("User API", () => {
  it("should show all users", async () => {
    const res = await request(app).get("/users");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          email: "john@gmail.com",
        }),
      ])
    );
  }),
    it("should show a user", async () => {
      const res = await request(app).get("/users/1");
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("email", "john@gmail.com");
    }),
    it("should create a new user", async () => {
      const res = await request(app).post("/users").send({
        first_name: "Bob",
        last_name: "Doe",
        email: "bob@doe.com",
        password: "123abcd",
      });
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty("email", "bob@doe.com");
    }),
    it("should update a user", async () => {
      const res = await request(app).put("/users/2").send({
        first_name: "Ze",
        last_name: "Doe",
        email: "ze@doe.com",
        password: "123abcd",
      });
      expect(res.statusCode).toEqual(202);
      expect(res.body).toHaveProperty("message", "User updated");
    }),
    it("should delete a user", async () => {
      const res = await request(app).del("/users/2");
      expect(res.statusCode).toEqual(204);
    });
});
