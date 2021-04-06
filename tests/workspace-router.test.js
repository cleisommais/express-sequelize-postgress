import "regenerator-runtime/runtime";
import request from "supertest";
const app = require("../app").default;
let id = "";
describe("workspaces API", () => {
  it("should show all workspaces", async () => {
    const res = await request(app).get("/workspaces");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: "John Doe Workspace",
        }),
      ])
    );
  }),
    it("should show a workspaces", async () => {
      const res = await request(app).get("/workspaces/1");
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("name", "John Doe Workspace");
    }),
    it("should create a new workspaces", async () => {
      const res = await request(app).post("/workspaces").send({
        name: "Isaac Workspace",
        access: 1,
        userId: 1,
      });
      id = res.body.id;
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty("name", "Isaac Workspace");
    }),
    it("should update a workspaces", async () => {
      const res = await request(app).put("/workspaces/" + id).send({
        name: "Isabella Workspace",
        access: 3,
      });
      expect(res.statusCode).toEqual(202);
      expect(res.body).toHaveProperty("message", "Workspace updated");
    }),
    it("should delete a workspaces", async () => {
      const res = await request(app).del("/workspaces/" + id);
      expect(res.statusCode).toEqual(204);
    });
});
