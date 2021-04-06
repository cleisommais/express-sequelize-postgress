import "regenerator-runtime/runtime";
import request from "supertest";
const app = require("../app").default;
let id = "";
describe("Subscription API", () => {
        it("Show create a new subscription", async () => {
            const res = await request(app).post("/subscriptions").send({
                type: 2,
                price: 299.99,
                cardNumber: 5459149816876403,
                cardExpirationYear: 2045,
                cardExpirationMonth: 2,
                securityCode: 520,
                userId: 2,
            });
            id = res.body.id;
            expect(res.statusCode).toEqual(201);
            expect(res.body).toHaveProperty("cardNumber", "5459149816876403");
        }),
        it("Show a subscription", async () => {
            const res = await request(app).get("/subscriptions/" + id);
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty("cardNumber", "5459149816876403");
        }),
        it("Should show all subscriptions", async () => {
            const res = await request(app).get("/subscriptions");
            expect(res.statusCode).toEqual(200);
            expect(res.body).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        cardNumber: "5459149816876403",
                    }),
                ])
            );
        }),        
        it("Show update a subscription", async () => {
            const res = await request(app).put("/subscriptions/" + id).send({
                type: 1,
                price: 99.99,
            });
            expect(res.statusCode).toEqual(202);
            expect(res.body).toHaveProperty("message", "Subscription updated");
        }),
        it("Show delete a subscription", async () => {
            const res = await request(app).del("/subscriptions/" + id);
            expect(res.statusCode).toEqual(204);
        });
});