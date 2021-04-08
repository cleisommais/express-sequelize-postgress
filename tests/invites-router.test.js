import "regenerator-runtime/runtime";
import request from "supertest";
const app = require("../app").default;
let id = "";
describe("Invites API", () => {
    it("Should all invites", async () => {
        const res = await request(app).get("/invites");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    url: "http://test.com/xpofsfisaoifaljk",
                }),
            ])
        );
    }),
        it("Should create a new invite", async () => {
            const res = await request(app).post("/invites").send({
                url: "http://test.com/fsa894651fafsoiuw",
                workspace_id: 2,
            });
            id = res.body.id;
            expect(res.statusCode).toEqual(201);
            expect(res.body).toHaveProperty(
                "url",
                "http://test.com/fsa894651fafsoiuw"
            );
        }),
        it("Should show an invites", async () => {
            const res = await request(app).get("/invites/" + id);
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty(
                "url",
                "http://test.com/fsa894651fafsoiuw"
            );
        }),
        it("Should update an invites", async () => {
            const res = await request(app)
                .put("/invites/" + id)
                .send({
                    url: "http://test.com/ut987455fssarerj",
                });
            expect(res.statusCode).toEqual(202);
            expect(res.body).toHaveProperty("message", "Invite updated");
        }),
        it("Should delete an invites", async () => {
            const res = await request(app).del("/invites/" + id);
            expect(res.statusCode).toEqual(204);
        });
});
