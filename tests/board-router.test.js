import "regenerator-runtime/runtime";
import request from "supertest";
const app = require("../app").default;
let id = "";
describe("Boards API", () => {
  it("Should all boards", async () => {
    const res = await request(app).get("/boards");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: "Apigee Udemy course",
        }),
      ])
    );
  }),
    it("Should show a boards", async () => {
      const res = await request(app).get("/boards/1");
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("name", "Apigee Udemy course");
    }),
    it("Should create a new board", async () => {
      const res = await request(app).post("/boards").send({
        name: "AWS Certificate Udemy course",
        access: 1,
        workspaceId: 1,
      });
      id = res.body.id;
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty("name", "AWS Certificate Udemy course");
    }),
    it("Should update a boards", async () => {
      const res = await request(app).put("/boards/" + id).send({
        access: 2,
      });
      expect(res.statusCode).toEqual(202);
      expect(res.body).toHaveProperty("message", "Board updated");
    }),
    it("Should delete a boards", async () => {
      const res = await request(app).del("/boards/" + id);
      expect(res.statusCode).toEqual(204);
    });
});
