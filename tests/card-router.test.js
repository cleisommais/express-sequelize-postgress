import "regenerator-runtime/runtime";
import request from "supertest";
const app = require("../app").default;
let id = "";
describe("Cards API", () => {
  it("Should all cards", async () => {
    const res = await request(app).get("/cards");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: "Create the architecture",
        }),
      ])
    );
  }),
    it("Should create a new card", async () => {
      const res = await request(app).post("/cards").send({
        name: "Define the data model of the project",
        type: 1,
        description: "Define the data model of the course",
        listId: 1,
      });
      id = res.body.id;
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty("name", "Define the data model of the project");
    }),
    it("Should show a cards", async () => {
        const res = await request(app).get("/cards/" + id);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("name", "Define the data model of the project");
      }),    
    it("Should update a cards", async () => {
      const res = await request(app).put("/cards/" + id).send({
        type: 2,
        description: "Define the data model of the course and generate postgres SQL script.",
      });
      expect(res.statusCode).toEqual(202);
      expect(res.body).toHaveProperty("message", "Card updated");
    }),
    it("Should delete a cards", async () => {
      const res = await request(app).del("/cards/" + id);
      expect(res.statusCode).toEqual(204);
    });
});
