import express from "express";
const router = express.Router();
const cardController = require("../controllers/card");

router
    .route("/")
    .get(cardController.getAllCards)
    .post(cardController.createCard);

router.use("/:id", cardController.getCardById);

router
    .route("/:id")
    .get((request, response, next) => {
        response.status(200).send(request.card);
    })
    .put(cardController.updateCardById)
    .delete(cardController.deleteCardById);

router
    .route("/:id/users")
    .get(cardController.listAllUsersFromCard)
    .post(cardController.addUsersToCard)
    .delete(cardController.removeUsersFromCard);

router
    .route("/:id/labels")
    .get(cardController.listAllLabelsFromCard)
    .post(cardController.addLabelsToCard)
    .delete(cardController.removeLabelsFromCard);

export default router;
