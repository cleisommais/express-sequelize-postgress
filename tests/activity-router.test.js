import "regenerator-runtime/runtime";
import request from "supertest";
const app = require("../app").default;
let id = "";
describe("Activities API", () => {
  it("Should all activities", async () => {
    const res = await request(app).get("/activities");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        }),
      ])
    );
  }),
    it("Should show an activity", async () => {
      const res = await request(app).get("/activities/1");
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("description", "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.");
    }),
    it("Should create a new activity", async () => {
      const res = await request(app).post("/activities").send({
        description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
        cardId: 1,
        userId: 3,
        boardId: 1,
      });
      id = res.body.id;
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty("description", "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.");
    }),
    it("Should update an activity", async () => {
      const res = await request(app).put("/activities/" + id).send({
        description: "There are ...",
      });
      expect(res.statusCode).toEqual(202);
      expect(res.body).toHaveProperty("message", "Activity updated");
    }),
    it("Should delete an activity", async () => {
      const res = await request(app).del("/activities/" + id);
      expect(res.statusCode).toEqual(204);
    });
});
