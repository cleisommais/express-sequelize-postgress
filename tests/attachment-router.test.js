import "regenerator-runtime/runtime";
import request from "supertest";
const app = require("../app").default;
let id = "";
describe("Attachments API", () => {
  it("Should all attachments", async () => {
    const res = await request(app).get("/attachments");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: "File 01",
        }),
      ])
    );
  }),
    it("Should show a attachments", async () => {
      const res = await request(app).get("/attachments/1");
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("name", "File 01");
    }),
    it("Should create a new attachment", async () => {
      const res = await request(app).post("/attachments").send({
        name: "File 02",
        url: "http://localhost/folders/public/file02.pdf",
        cardId: 2,
      });
      id = res.body.id;
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty("name", "File 02");
    }),
    it("Should update a attachments", async () => {
      const res = await request(app).put("/attachments/" + id).send({
        url: "http://localhost/folders/public/file02.docx",
      });
      expect(res.statusCode).toEqual(202);
      expect(res.body).toHaveProperty("message", "Attachment updated");
    }),
    it("Should delete a attachments", async () => {
      const res = await request(app).del("/attachments/" + id);
      expect(res.statusCode).toEqual(204);
    });
});
