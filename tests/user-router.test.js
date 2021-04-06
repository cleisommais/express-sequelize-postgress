import "regenerator-runtime/runtime";
import request from "supertest";
const app = require("../app").default;
let id = "";
describe("User API", () => {
    it("should create a new user", async () => {
      const res = await request(app).post("/users").send({
        lastName: "Doe",
        firstName: "Bob",
        email: "bob@doe.com",
        password: "123abcd",
      });
      id = res.body.id;
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty("email", "bob@doe.com");
    }),
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
        const res = await request(app).get("/users/" + id);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("email", "bob@doe.com");
      }),    
    it("should update a user", async () => {
      const res = await request(app).put("/users/" + id).send({
        firstName: "Ze",
        lastName: "Doe",
        email: "ze@doe.com",
        password: "123abcd",
      });
      expect(res.statusCode).toEqual(202);
      expect(res.body).toHaveProperty("message", "User updated");
    }),
    it("should delete a user", async () => {
      const res = await request(app).del("/users/" + id);
      expect(res.statusCode).toEqual(204);
    });
});
