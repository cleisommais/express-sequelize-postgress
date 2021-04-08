import "regenerator-runtime/runtime";
import request from "supertest";
const app = require("../app").default;
let id = "";
describe("Labels API", () => {
  it("Should all labels", async () => {
    const res = await request(app).get("/labels");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: "Test",
        }),
      ])
    );
  }),
    it("Should show a labels", async () => {
      const res = await request(app).get("/labels/1");
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("color", "Blue");
    }),
    it("Should create a new label", async () => {
      const res = await request(app).post("/labels").send({
        name: "Pre-Test",
        color: "Gray",
        boardId: 2,
      });
      id = res.body.id;
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty("name", "Pre-Test");
    }),
    it("Should update a labels", async () => {
      const res = await request(app).put("/labels/" + id).send({
        color: "Yellow",
      });
      expect(res.statusCode).toEqual(202);
      expect(res.body).toHaveProperty("message", "Label updated");
    }),
    it("Should delete a labels", async () => {
      const res = await request(app).del("/labels/" + id);
      expect(res.statusCode).toEqual(204);
    });
});
