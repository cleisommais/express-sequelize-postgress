import "regenerator-runtime/runtime";
import request from "supertest";
const app = require("../app").default;
let id = "";
describe("Lists API", () => {
  it("Should all lists", async () => {
    const res = await request(app).get("/lists");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: "Doing",
        }),
      ])
    );
  }),
    it("Should show a lists", async () => {
      const res = await request(app).get("/lists/1");
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("name", "Todo");
    }),
    it("Should create a new list", async () => {
      const res = await request(app).post("/lists").send({
        name: "Todo",
        order: 0,
        boardId: 2,
      });
      id = res.body.id;
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty("name", "Todo");
    }),
    it("Should update a lists", async () => {
      const res = await request(app).put("/lists/" + id).send({
        order: 1,
      });
      expect(res.statusCode).toEqual(202);
      expect(res.body).toHaveProperty("message", "List updated");
    }),
    it("Should delete a lists", async () => {
      const res = await request(app).del("/lists/" + id);
      expect(res.statusCode).toEqual(204);
    });
});
