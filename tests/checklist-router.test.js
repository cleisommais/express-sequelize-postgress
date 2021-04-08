import "regenerator-runtime/runtime";
import request from "supertest";
const app = require("../app").default;
let id = "";
describe("Checklists API", () => {
  it("Should all checklists", async () => {
    const res = await request(app).get("/checklists");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: "Check 01",
        }),
      ])
    );
  }),
    it("Should show a checklists", async () => {
      const res = await request(app).get("/checklists/1");
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("name", "Check 01");
    }),
    it("Should create a new checklist", async () => {
      const res = await request(app).post("/checklists").send({
        name: "Check 02",
        isDone: false,
        cardId: 2,
      });
      id = res.body.id;
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty("name", "Check 02");
    }),
    it("Should update a checklists", async () => {
      const res = await request(app).put("/checklists/" + id).send({
        isDone: true,
      });
      expect(res.statusCode).toEqual(202);
      expect(res.body).toHaveProperty("message", "Checklist updated");
    }),
    it("Should delete a checklists", async () => {
      const res = await request(app).del("/checklists/" + id);
      expect(res.statusCode).toEqual(204);
    });
});
